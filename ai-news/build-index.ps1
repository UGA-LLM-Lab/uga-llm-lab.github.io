# Rebuild the lightweight archive from the editable monthly data.js files.
# Run from any directory: powershell -File ai-news/build-index.ps1
$ErrorActionPreference = 'Stop'
$pageSize = 50
$utf8 = New-Object System.Text.UTF8Encoding($false)
$registry = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot 'catalog.js'), $utf8)
$monthIds = [regex]::Matches($registry, 'id:\s*"(\d{4}-\d{2})"') |
    ForEach-Object { $_.Groups[1].Value }
$articles = @()

foreach ($monthId in $monthIds) {
    $path = Join-Path $PSScriptRoot "$monthId/data.js"
    $source = [System.IO.File]::ReadAllText($path, $utf8)
    $pattern = 'window\.AI_NEWS_MONTH_DATA\[\s*["'']' + [regex]::Escape($monthId) + '["'']\s*\]\s*=\s*'
    $assignment = [regex]::Match($source, $pattern)
    if (-not $assignment.Success) { throw "Cannot find month assignment in $path" }
    $json = $source.Substring($assignment.Index + $assignment.Length).Trim() -replace ';\s*$', ''
    $month = $json | ConvertFrom-Json

    foreach ($article in $month.articles) {
        if ($article.hidden) { continue }
        if ($article.sortDate -notmatch '^\d{4}-\d{2}-\d{2}$') {
            throw "Invalid date for $($article.slug)"
        }
        # Only card metadata is downloaded by the archive; the body stays in data.js.
        $card = [ordered]@{
            slug = $article.slug
            category = $article.category
            sortDate = $article.sortDate
            dateLabel = $article.dateLabel
            title = $article.title
            summary = $article.summary
            monthId = $monthId
            monthLabel = $month.label
        }
        if ($article.image) { $card.image = $article.image }
        if ($article.pinned) { $card.pinned = $true }
        $articles += [PSCustomObject]$card
    }
}

$duplicates = $articles | Group-Object slug | Where-Object Count -gt 1
if ($duplicates) { throw "Duplicate article slugs: $($duplicates.Name -join ', ')" }
$articles = @($articles | Sort-Object @{Expression = {[bool]$_.pinned}; Descending = $true},
    @{Expression = {$_.sortDate}; Descending = $true})
$outputDirectory = Join-Path $PSScriptRoot 'archive'
[System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
$pages = @()

for ($offset = 0; $offset -lt $articles.Count; $offset += $pageSize) {
    $number = [int]($offset / $pageSize) + 1
    $end = [Math]::Min($offset + $pageSize, $articles.Count) - 1
    $page = @{articles = @($articles[$offset..$end])}
    $filename = "page-$number.json"
    $json = ConvertTo-Json -InputObject $page -Depth 20
    [System.IO.File]::WriteAllText((Join-Path $outputDirectory $filename), "$json`n", $utf8)
    $pages += "ai-news/archive/$filename"
}

$index = [ordered]@{
    pageSize = $pageSize
    total = $articles.Count
    pages = $pages
    weekly = @($articles | Where-Object category -like 'AI Weekly*')
}
$json = ConvertTo-Json -InputObject $index -Depth 20
[System.IO.File]::WriteAllText((Join-Path $outputDirectory 'index.json'), "$json`n", $utf8)
Write-Output "Built $($pages.Count) archive pages for $($articles.Count) articles ($pageSize per page)."
