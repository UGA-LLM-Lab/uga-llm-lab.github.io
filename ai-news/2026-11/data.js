window.AI_NEWS_MONTH_DATA["2026-11"] = {
  "label": "November 2026",
  "articles": [
    {
      "slug": "amd-q3-2026-data-center-revenue-97-percent",
      "category": "Industry",
      "sortDate": "2026-11-03",
      "dateLabel": "November 3, 2026",
      "title": "AMD reports $8.5 billion in quarterly data-center revenue, up 97%",
      "summary": "AMD’s November 3 results show total third-quarter revenue of $13.4 billion. Its data-center business includes both Instinct accelerators and EPYC processors; the $17 billion fourth-quarter outlook remains a forecast.",
      "image": {
        "src": "ai-news/2026-11/images/amd-official-investor-relations-artwork.jpg",
        "alt": "AMD wordmark over an illustrated circuit board.",
        "caption": "Official AMD investor-relations artwork. The background is promotional imagery, not a photograph of the specific hardware covered by these results."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "AMD reported third-quarter 2026 results on November 3, with data-center revenue reaching $8.5 billion, up 97% from a year earlier. Total company revenue was $13.377 billion, commonly rounded to $13.4 billion, up 45% year over year and 16% from the previous quarter. The results cover the quarter ended September 26; November 3 is their publication date, not the end of the measured sales period."
        },
        {
          "type": "paragraph",
          "text": "AMD attributed the data-center increase to demand for EPYC processors and the launch of Instinct MI450-series GPUs. The segment combines those businesses, so its $8.5 billion total should not be described as AI-accelerator revenue alone. The release does not break out Instinct revenue within that figure. It is evidence of growth in AMD’s broader server and accelerator business, with an important AI component."
        },
        {
          "type": "heading",
          "text": "Data center drives a changing business mix"
        },
        {
          "type": "paragraph",
          "text": "Using the rounded segment figure and exact company revenue, data center accounted for about 64% of quarterly sales. That calculation indicates the segment’s weight within AMD, rather than its share of the worldwide AI-chip market. It also does not reveal how much revenue came from training models, serving them or running other server workloads. Those uses require a different breakdown from the one supplied in the announcement."
        },
        {
          "type": "paragraph",
          "text": "The rest of AMD’s business moved differently. Client and Gaming revenue was $3.7 billion, down 8% year over year, while Embedded revenue was $1.1 billion, up 29%. Within Client and Gaming, client revenue rose 7% to $2.9 billion and gaming revenue fell 40% to $773 million. The contrast helps explain why a near-doubling in one segment did not translate into a near-doubling of total company sales."
        },
        {
          "type": "paragraph",
          "text": "AMD reported quarterly GAAP net income of $2.428 billion and diluted earnings of $1.46 a share. Its adjusted, non-GAAP figures were $3.471 billion and $2.09, respectively. GAAP gross margin was 54%, compared with 56% under the company’s adjusted presentation. These are different accounting presentations for the same quarter. They should not be mixed into one profit comparison without considering the adjustments, which the company reconciles in the release."
        },
        {
          "type": "heading",
          "text": "The next-quarter outlook is a separate claim"
        },
        {
          "type": "paragraph",
          "text": "For the fourth quarter, AMD projected approximately $17 billion in revenue, plus or minus 3%, and a non-GAAP gross margin of about 55%. The revenue midpoint implies roughly 27% sequential growth; the stated range corresponds to approximately $16.49 billion to $17.51 billion. These are management expectations, not sales already recorded or a guarantee of orders converting into revenue on that schedule."
        },
        {
          "type": "paragraph",
          "text": "For AI infrastructure readers, the new information is the quarterly financial evidence and the forward outlook. Product announcements and acquisitions summarized among the release’s recent highlights have their own original dates. The results strengthen the evidence that server and accelerator demand is reshaping AMD’s sales mix, while leaving GPU-only revenue, customer deployment outcomes and the eventual fourth-quarter result to separate disclosures."
        }
      ],
      "sources": [
        {
          "label": "AMD: November 3 earnings release, segment results and accounting reconciliation",
          "url": "https://ir.amd.com/news-events/press-releases/detail/1303/amd-reports-third-quarter-2026-financial-results"
        },
        {
          "label": "AMD: official newsroom publication and original timestamp",
          "url": "https://newsroom.amd.com/news/amd-reports-third-quarter-2026-earnings/"
        }
      ]
    },
    {
      "slug": "crowdstrike-fiddler-agreement-guardian-ai-kill-switch",
      "category": "Industry",
      "sortDate": "2026-11-03",
      "dateLabel": "November 3, 2026",
      "title": "CrowdStrike agrees to acquire Fiddler and adds controls for AI agents",
      "summary": "The November 3 announcements pair a proposed observability acquisition with new Falcon Guardian controls. The kill switch starts at the gateway; endpoint termination and Falcon Observe remain future capabilities.",
      "image": {
        "src": "ai-news/2026-11/images/crowdstrike-fiddler-official-announcement.jpg",
        "alt": "CrowdStrike and Fiddler wordmarks on an illustrated space background.",
        "caption": "Fiddler’s original promotional artwork for the November 3 acquisition agreement. The transaction and planned product integration remain subject to completion."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "CrowdStrike announced a definitive agreement to acquire Fiddler AI on November 3, alongside new controls for AI agents in Falcon Guardian. The two developments address different problems: stopping unauthorized activity while an agent runs, and understanding whether its behavior matches the task it was given. The acquisition remains subject to closing conditions; announcing it does not make Fiddler an integrated Falcon product today."
        },
        {
          "type": "paragraph",
          "text": "CrowdStrike plans to sell the acquired capabilities as Falcon Observe, targeting general availability in its fiscal fourth quarter of FY27. The company describes evaluations before deployment, monitoring during production, and traces of tool calls and decisions. It also lists OpenTelemetry instrumentation and support for frameworks including LangGraph, AWS Strands and Google ADK. Those are the intended capabilities of the offering, rather than an independently verified account of a completed rollout."
        },
        {
          "type": "heading",
          "text": "What is available now"
        },
        {
          "type": "paragraph",
          "text": "The separate Guardian announcement identifies an AI Kill Switch that initially operates at the gateway, with endpoint termination still to come. It also makes the AI Gateway generally available and includes it with Guardian. That gateway inspects requests and responses and applies policy. Existing Guardian availability since September should therefore be distinguished from these November additions."
        },
        {
          "type": "paragraph",
          "text": "Other controls include hooks inside supported coding assistants and a Falcon sensor running within the Claude Cowork virtual machine. Endpoint network inspection is generally available on Windows, while Mac support is in early access. The announcement treats agent identity controls and broader cloud coverage separately, so customers should check their particular platform and deployment rather than assume every announced feature has the same availability."
        },
        {
          "type": "paragraph",
          "text": "Fiddler founder Krishna Gade’s accompanying account explains the behavioral side of the deal. An agent can use legitimate credentials and approved tools yet still exceed its instructions. His illustrative example is an incident-investigation agent changing an access policy after encountering a permissions error. A successful command would not, by itself, show that the change was authorized. Fiddler’s role is to connect the instructions, actions and results so teams can investigate that difference."
        },
        {
          "type": "heading",
          "text": "Combining prevention with an audit trail"
        },
        {
          "type": "paragraph",
          "text": "The practical implication is that access control and task correctness need separate evidence. Blocking a dangerous action can limit exposure, but it does not explain how an agent reached that action. Conversely, a detailed trace can support investigation without being a guarantee that the next action will be safe. Connecting the two could help operators turn an observed failure into a test and a control."
        },
        {
          "type": "paragraph",
          "text": "The announcements provide no independent comparative safety evaluation or assurance that these controls prevent every prompt-injection or policy failure. They also do not publish transaction economics in the cited releases. For an organization evaluating the combined offering, the immediate questions are which agents and operating systems are covered, where enforcement occurs, and which promised observability features depend on a future integration."
        }
      ],
      "sources": [
        {
          "label": "CrowdStrike: definitive Fiddler acquisition agreement, November 3",
          "url": "https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-acquire-fiddler-deliver-agent-observability-ai-trust"
        },
        {
          "label": "CrowdStrike: Guardian features and availability, November 3",
          "url": "https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-delivers-ai-security-and-safety-enterprise"
        },
        {
          "label": "Fiddler: founder’s announcement and workflow example",
          "url": "https://www.fiddler.ai/blog/fiddler-joins-crowdstrike"
        }
      ]
    },
    {
      "slug": "ai2-statebench-long-context-state-tracking-benchmark",
      "category": "Research",
      "sortDate": "2026-11-03",
      "dateLabel": "November 3, 2026",
      "title": "Ai2 releases StateBench to test whether language models can follow changing information",
      "summary": "The four-level benchmark separates simple retrieval from dependent state updates. Its experiments distinguish specially trained models from pretrained systems, which still struggle on long, difficult sequences.",
      "image": {
        "src": "ai-news/2026-11/images/ai2-statebench-official-release-artwork.png",
        "alt": "Colored paths change position across a diagram illustrating state tracking.",
        "caption": "Ai2’s original StateBench release illustration. It depicts changing state and is not a chart of measured model performance."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "Ai2 introduced StateBench on November 3, an open benchmark for tracking information that changes across a long input. It asks whether a language model can follow updates to variables and recover their final state. The institutional announcement accompanies a paper by Jackson Petty, William Merrill and Ashish Sabharwal whose first arXiv version was submitted on November 2. November 3 marks the institutional benchmark announcement; the preprint appeared a day earlier."
        },
        {
          "type": "heading",
          "text": "Four kinds of updates"
        },
        {
          "type": "paragraph",
          "text": "The benchmark distinguishes information that never changes, values that can be overwritten, updates that depend on a variable’s own current value, and updates involving another variable. These are called r-trivial, aperiodic, soluble and general finite state tracking. The progression separates finding a relevant assignment from maintaining a chain of dependencies in which a missed operation changes the answer."
        },
        {
          "type": "paragraph",
          "text": "The released generator derives easier problems from the same underlying assignment trace, controlling such details as the variables, update positions and values. It also renders tasks in different surface forms. That design lets researchers investigate whether a performance difference comes from the state-tracking operation or simply from the way a question is written. The repository provides generation and dataset-building instructions under an Apache 2.0 code license."
        },
        {
          "type": "heading",
          "text": "Training on the task changes the comparison"
        },
        {
          "type": "paragraph",
          "text": "In the paper’s direct-training experiment, six architecture variants used 275-million-parameter models trained on sequences containing up to 256 assignments. Evaluation extended to 64,000 assignments, 250 times that maximum training length. Recurrent Gated DeltaNet and hybrid models generalized much farther than transformers on several levels. Their strongest results on the hardest level nevertheless covered a shorter extension than their results on the easier levels."
        },
        {
          "type": "paragraph",
          "text": "That experiment should be kept separate from testing models already pretrained for general use. Ai2 reports that open pretrained models struggled more than direct training or theoretical expressivity might suggest. Performance also depended on formatting: a system could perform strongly on one presentation and poorly on another encoding of the same underlying task. The existence of an architecture capable of representing a solution therefore does not show that ordinary pretraining has taught it that solution."
        },
        {
          "type": "paragraph",
          "text": "The frontier-model experiment tested Gemini 3.8 Flash, Claude Opus 5.5, GPT-6 Sol and GPT-6 Luna by asking them to generate final variable values. All handled the simpler levels relatively well, while results deteriorated as harder sequences grew. These generated-answer results should not be treated as the same scoring setup as the paper’s five-option multiple-choice tests."
        },
        {
          "type": "figure",
          "src": "ai-news/2026-11/images/ai2-statebench-frontier-model-results.png",
          "alt": "Original StateBench charts compare frontier-model accuracy across four levels as input token counts increase.",
          "caption": "Ai2’s unmodified chart of generated final-state answers on StateBench. Input length is in tokens; the results are separate from the paper’s directly trained and multiple-choice experiments. Open the full-size image to read every label."
        },
        {
          "type": "paragraph",
          "text": "For developers working with long documents or agents, StateBench offers a way to probe a narrower capability than advertised context-window size: retaining the consequences of changes within that window. The study uses synthetic tasks and a fixed number of variables. It does not measure an entire software-engineering workflow, and its framework does not yet cover an unbounded stream of newly introduced entities. Those boundaries make it useful as a diagnostic, while leaving broader real-world reliability to separate evaluation."
        }
      ],
      "sources": [
        {
          "label": "Ai2: StateBench announcement, November 3",
          "url": "https://allenai.org/blog/statebench"
        },
        {
          "label": "Petty, Merrill and Sabharwal: reviewed paper, arXiv 2611.03094v1",
          "url": "https://arxiv.org/html/2611.03094v1"
        },
        {
          "label": "Ai2: StateBench source code and generation instructions",
          "url": "https://github.com/allenai/state-bench"
        },
        {
          "label": "Ai2: released StateBench dataset",
          "url": "https://huggingface.co/datasets/allenai/state-bench"
        }
      ]
    },
    {
      "slug": "openai-mazda-physical-engineering-research-collaboration",
      "category": "Industry",
      "sortDate": "2026-11-03",
      "dateLabel": "November 3, 2026",
      "title": "OpenAI adds Mazda research collaboration and tests AI-assisted hardware design",
      "summary": "A November 3 engineering update describes work on vehicle simulations, scan-to-CAD workflows and a prototype device. Human review and manufacturing revisions remain central to the reported work.",
      "image": {
        "src": "ai-news/2026-10/images/openai-official-logo-on-dark.svg",
        "alt": "Official OpenAI logo.",
        "caption": "OpenAI. The November 3 update describes research collaborations and engineering workflows under human review."
      },
      "sources": [
        {
          "label": "OpenAI: engineering update, November 3",
          "url": "https://openai.com/index/accelerating-engineering-for-the-physical-world/"
        },
        {
          "label": "OpenAI: background on the existing Chip Ganassi Racing collaboration",
          "url": "https://openai.com/index/chip-ganassi-racing/"
        }
      ],
      "content": [
        {
          "type": "paragraph",
          "text": "OpenAI announced a research collaboration with Mazda on November 3 and an expansion of its existing work with Chip Ganassi Racing. The engineering update describes models helping with physical design and simulation, alongside an internal prototype-device exercise. It presents early workflows and company-reported results, rather than a new general-purpose engineering product or a vehicle ready for sale."
        },
        {
          "type": "paragraph",
          "text": "At Mazda, OpenAI researchers and forward deployed engineers are working with aerodynamics and crash-safety specialists on vehicle-design simulations. The stated goal is to explore airflow and structural behavior while respecting styling and cost constraints. With Ganassi, the work includes converting scans of existing parts into editable CAD models and manufacturing drawings, with engineers checking accuracy and manufacturability."
        },
        {
          "type": "heading",
          "text": "From race data to physical parts"
        },
        {
          "type": "paragraph",
          "text": "The Ganassi relationship predates this announcement. OpenAI’s background account describes a first-year focus on race, car-sensor and pit-crew data, followed by efforts to connect those inputs for engineers. The newly described scan-to-design workflow extends that relationship into prototyping. It is particularly relevant to parts whose original digital design files are unavailable; it is not evidence that a model has independently designed a race-winning component."
        },
        {
          "type": "paragraph",
          "text": "The distinction matters because a scan records an object’s observed geometry, while a useful engineering model must also support changes and downstream production work. An editable file can be valuable even when it still needs an engineer’s corrections. The practical test is whether it reduces the effort required to produce an accurate, usable design, rather than whether its first rendering looks convincing."
        },
        {
          "type": "heading",
          "text": "A prototype still needed manufacturing review"
        },
        {
          "type": "figure",
          "src": "ai-news/2026-11/images/openai-prototype-device-enclosure-original.png",
          "alt": "Original OpenAI prototype-enclosure drawing with dimensions and tolerances in millimeters.",
          "caption": "OpenAI’s original prototype enclosure drawing, reproduced unchanged. Dimensions are in millimeters; this is a prototype design artifact, not evidence of a production-qualified device. Open the full-size drawing for its specifications."
        },
        {
          "type": "paragraph",
          "text": "OpenAI also reports that two team members used GPT-6 Astra to develop a device for talking to Codex in under a week as a side project. A manufacturer produced a small prototype batch within a month. The model contributed enclosure, circuit-board and software work, but production required repeated review and iteration because it missed manufacturing limits, tolerances and assembly details."
        },
        {
          "type": "paragraph",
          "text": "OpenAI reports higher engineering-task benchmark scores for a newer internal model and a 23-fold increase in hardware-team token usage since February. Neither measure establishes a matching increase in engineering productivity. Usage measures how much the tools are called; benchmark results cover specified tasks. Neither directly measures production cost, defect rates or the time required for an entire approved design."
        },
        {
          "type": "paragraph",
          "text": "The company invites engineering firms and software vendors to propose use cases through an interest form, with no general service rollout announced. For engineers, the reported examples suggest a workflow that moves between generation, simulation and review. A promising drawing is an input to that process, while fabrication and testing provide different evidence. The Mazda work is still a research collaboration, and the update gives no controlled comparison of vehicle performance or crash outcomes. Its immediate significance is the range of engineering work being tested and the remaining gap between a model-generated design and a validated physical product."
        }
      ]
    },
    {
      "slug": "miro-workforce-survey-ai-productivity-collaboration-gap",
      "category": "Employment / Talent",
      "sortDate": "2026-11-03",
      "dateLabel": "November 3, 2026",
      "title": "Miro survey finds stronger perceived AI gains in speed than in collaboration",
      "summary": "A November 3 report draws on 9,502 respondents surveyed in September and October. Its findings describe workers’ perceptions of output, review burdens and organizational practice, rather than measured productivity or job losses.",
      "image": {
        "src": "ai-news/2026-11/images/miro-intelligent-collaboration-official-report-cover.png",
        "alt": "Miro promotional artwork displaying The State of Intelligent Collaboration report.",
        "caption": "Original Miro report artwork. Its illustrative workplace scene does not document the people surveyed."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "Miro released its State of Intelligent Collaboration research on November 3, reporting a gap between perceived individual benefits from AI and improvements in how teams work together. In the survey, 83% agreed that AI made individuals more productive, while 73% reported faster output and 56% reported better output quality. These are respondents’ assessments, not independently measured changes in work completed per hour."
        },
        {
          "type": "paragraph",
          "text": "The report’s principal charts identify a sample of 9,502 leaders and employees. Miro conducted the online survey during September and October 2026 across North America, Latin America, Europe and Asia-Pacific, offering a small participation incentive. Respondents worked in functions including product development, engineering, IT, operations, design and strategy. The demographic appendix describes approximately equal shares of individual contributors and director-level-or-higher respondents."
        },
        {
          "type": "heading",
          "text": "No improvement is different from deterioration"
        },
        {
          "type": "paragraph",
          "text": "The distinction is especially important in the findings on decision-making and collaboration. For decisions, 48% reported improvement, 43% no change and 9% decline. For collaboration, the corresponding shares were 40%, 47% and 13%. Thus the headline finding that most respondents had not seen better collaboration does not mean most said collaboration had worsened. Combining unchanged and declining responses answers a different question from measuring deterioration alone."
        },
        {
          "type": "paragraph",
          "text": "Miro’s accompanying announcement highlights fragmentation in where AI-assisted work happens. Sixty-nine percent said most such work occurred in private sessions rather than shared spaces. The report also identifies a heavier review burden: 59% reported more AI-generated output to review. These observations describe a potential coordination problem, but the survey does not experimentally establish that private AI sessions caused slower decisions or lower-quality work."
        },
        {
          "type": "paragraph",
          "text": "Employees’ concerns about roles also require care. The report asks about blurred responsibilities, job security and the possibility of related roles merging. Agreement with those statements measures perceptions and expectations. It is not a count of positions eliminated, occupations merged or workers displaced. Likewise, a respondent describing more output to review does not establish that total working hours increased by a particular amount."
        },
        {
          "type": "heading",
          "text": "Reading a vendor-sponsored survey"
        },
        {
          "type": "paragraph",
          "text": "The methods appendix gives geography, functions, company-size groups and broad seniority composition, but does not explain a probability sampling design or publish weighting and uncertainty estimates. The results should therefore be read as findings within this surveyed group, rather than precise estimates for all workers or countries. A large sample does not by itself resolve recruitment or self-selection bias."
        },
        {
          "type": "paragraph",
          "text": "Miro sells collaboration software and uses the report to argue for shared AI workspaces and stronger governance. That commercial interest is relevant when assessing its recommendations about workplace tools and practices. The evidence supports a more limited conclusion: respondents often saw gains in producing work faster without equally widespread improvements in collective decisions. For employers, measuring review time, handoffs and decision quality alongside individual output would test whether that reported gap also exists in their own workflows."
        }
      ],
      "sources": [
        {
          "label": "Miro: original research announcement, November 3",
          "url": "https://miro.com/blog/state-of-intelligent-collaboration-2026/"
        },
        {
          "label": "Miro: full 12-page report, figures and methodological appendix",
          "url": "https://go2.miro.com/rs/228-GPV-835/images/The%20State%20of%20Intelligent%20Collaboration%202026.pdf"
        },
        {
          "label": "Miro / Business Wire: original release carried by TT, November 3",
          "url": "https://via.tt.se/pressmeddelande/4626809/individual-ai-productivity-soars-but-organizational-impact-stalls?lang=en&publisherId=259167"
        }
      ]
    },
    {
      "slug": "marvell-lumentum-115-billion-all-stock-agreement",
      "category": "Industry",
      "sortDate": "2026-11-02",
      "dateLabel": "November 2, 2026",
      "title": "Marvell agrees to buy Lumentum in a $115 billion AI connectivity deal",
      "summary": "The November 2 announcement combines chip and photonics technologies. The agreement was signed November 1, and closing is expected in the first half of 2028, subject to approvals.",
      "image": {
        "src": "ai-news/2026-11/images/marvell-official-wordmark.png",
        "alt": "Official Marvell wordmark.",
        "caption": "Official Marvell wordmark from its investor-relations site. The proposed Lumentum transaction remains subject to approvals."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "Marvell and Lumentum announced on November 2 that Marvell has agreed to acquire Lumentum in an all-stock transaction with an implied enterprise value of $115 billion. The companies are seeking to bring electrical interconnects, custom chips and optical components into a more closely integrated supply chain for AI infrastructure. This is a signed acquisition agreement: the companies expect the transaction to close in the first half of calendar 2028, subject to shareholder and regulatory approvals and other customary conditions."
        },
        {
          "type": "paragraph",
          "text": "The merger agreement is dated November 1, while the public announcement is November 2. Under its fixed exchange ratio, each Lumentum share would receive 4.500 shares of Marvell common stock. The announcement values that consideration at approximately $1,132 per Lumentum share and describes a 23.9% premium using the companies’ unaffected October 28 closing prices. Because the consideration is stock, that indicated dollar value is tied to the reference share prices; it is not a fixed cash payment."
        },
        {
          "type": "heading",
          "text": "Connecting AI systems across electrical and optical links"
        },
        {
          "type": "paragraph",
          "text": "Marvell contributes technologies including high-speed electrical and optical interconnects, network switching, custom accelerators and the chips that connect accelerators to surrounding systems. Lumentum contributes lasers, optical transceivers, optical circuit switching and compound-semiconductor manufacturing, including indium phosphide. These are complementary parts of the signal chain that moves data between computing systems and, increasingly, closer to the processors themselves."
        },
        {
          "type": "paragraph",
          "text": "The companies’ rationale is that growing bandwidth requirements and the physical limits of copper links make it useful to design electrical and optical components together. Their proposed portfolio spans connections between distributed data centers, between servers and racks, and within more tightly coupled computing systems. They expect closer design and packaging coordination to produce pre-validated optical solutions and shorten customers’ development cycles. Those are objectives for the combined company, rather than measured performance gains established by the announcement."
        },
        {
          "type": "heading",
          "text": "Ownership and integration remain ahead"
        },
        {
          "type": "paragraph",
          "text": "After closing, existing Marvell shareholders would own approximately 67% of the combined company on a fully diluted basis, with Lumentum shareholders holding approximately 33%. Marvell chairman and chief executive Matt Murphy would continue in those roles. Three Lumentum directors, including chief executive Michael Hurlston, would join Marvell’s board, which currently has seven directors."
        },
        {
          "type": "paragraph",
          "text": "The companies also project more than $1 billion in annual run-rate cost synergies and an improvement in Marvell’s non-GAAP earnings per share in the first year after closing. These are forward-looking financial expectations. The release does not establish that the savings have occurred, that customers have deployed a new combined product, or that the companies have already completed integration."
        },
        {
          "type": "paragraph",
          "text": "For AI infrastructure buyers, the proposed combination would put more of the optical and electrical connectivity stack under one supplier. Whether that produces the promised engineering and manufacturing benefits depends on approvals, execution and the products ultimately delivered. Until the transaction closes, the November 2 milestone is the public agreement and its terms, with a lengthy approval and integration timetable still to come."
        }
      ],
      "sources": [
        {
          "label": "Lumentum: November 2 joint announcement, transaction terms and conditions",
          "url": "https://investor.lumentum.com/financial-news-releases/news-details/2026/Marvell-and-Lumentum-to-Combine-Creating-a-Category-Leader-in-AI-Connectivity/default.aspx"
        },
        {
          "label": "Marvell: original November 2 announcement PDF",
          "url": "https://investor.marvell.com/_assets/_4b2ef940d8378f4928a6a90255e70f76/marvell/news/2026-11-02_Marvell_and_Lumentum_to_Combine_Creating_a_1040.pdf"
        },
        {
          "label": "SEC: November 1 agreement reported in November 2 filing",
          "url": "https://www.sec.gov/Archives/edgar/data/1835632/000119312526442717/d352474d8k.htm"
        }
      ]
    },
    {
      "slug": "anthropic-amended-s1-third-quarter-revenue-compute-commitments",
      "category": "Industry",
      "sortDate": "2026-11-02",
      "dateLabel": "November 2, 2026",
      "title": "Anthropic’s updated IPO filing reports $17 billion in quarterly revenue",
      "summary": "The November 2 amendment adds third-quarter results and details about long-term compute obligations. Revenue, operating losses, financing-related accounting charges and future commitments measure different things.",
      "image": {
        "src": "ai-news/2026-10/images/anthropic-official-wordmark.png",
        "alt": "Official Anthropic wordmark.",
        "caption": "Official Anthropic wordmark reused from the published archive for source identification."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "Anthropic filed an amended registration statement with the U.S. Securities and Exchange Commission on November 2, reporting $17.0 billion in revenue for the three months ended September 30, 2026. The comparable quarter a year earlier generated $1.4 billion. The amendment supplies a new view of the Claude maker’s business ahead of its proposed public offering; it is a financial update to the registration first announced October 26, rather than a completed IPO."
        },
        {
          "type": "paragraph",
          "text": "The company reported an operating loss of $567 million for the September quarter, compared with a $3.1 billion operating loss in the same quarter of 2025. Anthropic attributes the latest quarter’s operating result partly to $5.0 billion of compute obtained under short-term commitments, which it says costs substantially more than comparable capacity under multi-year arrangements, and $2.0 billion in non-cash charges related to its donation-matching program."
        },
        {
          "type": "heading",
          "text": "A large accounting loss is different from cash spending"
        },
        {
          "type": "paragraph",
          "text": "For the first nine months of 2026, the filing reports a $104.0 billion net loss. That figure includes $94.3 billion in changes in the fair value of convertible notes, derivative liabilities and SAFEs, primarily associated with increases in the company’s valuation. It should not be read as a claim that Anthropic spent $104 billion in cash running its models during those nine months. Operating loss, net loss and the cash needed to supply computing capacity describe different parts of the business."
        },
        {
          "type": "paragraph",
          "text": "The distinction also matters when comparing a fast-growing model business with its infrastructure requirements. Revenue records customer purchases recognized in a period. Long-term agreements can commit a company to future payments before the associated capacity is available, while the accounting value of financing instruments can change independently of the current cost of serving Claude."
        },
        {
          "type": "heading",
          "text": "Compute obligations extend well beyond the current quarter"
        },
        {
          "type": "paragraph",
          "text": "As of and subsequent to September 30, Anthropic says it had entered into purchase commitments and lease agreements with aggregate committed spending of approximately $895.4 billion, substantially all related to compute and infrastructure. The total includes short-term commitments and leases that have not yet begun. Approximately $447.5 billion is expected to be incurred before the end of 2030, with substantially all of the remainder between 2031 and 2045. About $69.8 billion is due in the twelve months following September 30, 2026."
        },
        {
          "type": "paragraph",
          "text": "These obligations are not all unconditional payments already made. The filing identifies approximately $213.8 billion of arrangements subject to exercisable termination rights or conditions before commencement, such as a counterparty obtaining financing, facilities or regulatory approvals. Anthropic also warns that much of its customer revenue is consumption-based, whereas its infrastructure commitments generally run for multiple years. Future usage and the cost and timing of available capacity therefore remain material business risks."
        },
        {
          "type": "paragraph",
          "text": "The preliminary prospectus still leaves the number of offered shares and the price range blank and says Anthropic has applied to list on Nasdaq as ANT. Those omissions limit what can be inferred about the offering’s final size or valuation. The new disclosure shows rapidly expanding quarterly sales alongside costly capacity procurement and substantial future obligations; it does not establish sustained profitability or a completed public-market fundraising."
        }
      ],
      "sources": [
        {
          "label": "SEC: Anthropic November 2 Form S-1/A, financial results and contractual obligations",
          "url": "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm"
        },
        {
          "label": "Anthropic: original October 26 proposed-IPO announcement",
          "url": "https://www.anthropic.com/news/s1-sec"
        }
      ]
    },
    {
      "slug": "openai-grid-protectors-program-georgia-flexible-demand",
      "category": "Industry",
      "sortDate": "2026-11-02",
      "dateLabel": "November 2, 2026",
      "title": "OpenAI launches Grid Protectors around flexible data-center power demand",
      "summary": "The November 2 program builds on an existing Georgia Power agreement for a planned Effingham County campus. Its demand-response commitment and projected customer savings are future arrangements, not demonstrated operating results.",
      "image": {
        "src": "ai-news/2026-10/images/openai-official-logo-on-dark.svg",
        "alt": "Official OpenAI logo.",
        "caption": "Official OpenAI logo reused from the published archive. The Effingham campus described in the program remains planned."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "OpenAI announced the Grid Protectors Program on November 2, proposing arrangements under which its future compute campuses would reduce electricity demand when local grids are under strain. The company identifies Georgia as the starting point and its planned Effingham County campus as an intended pilot. The program extends an existing electricity agreement into a broader approach to future campuses; it does not mean the Georgia facility is already operating or supplying emergency support."
        },
        {
          "type": "paragraph",
          "text": "The central mechanism is demand response: a utility can call on a large customer to draw less power during periods such as extreme heat or cold. OpenAI says future agreements will specify how much demand can be reduced, how quickly and for how long, with terms varying by location. Depending on local requirements and available equipment, campuses may also contribute through on-site generation or storage and use batteries and power controls to smooth changes in demand."
        },
        {
          "type": "heading",
          "text": "The Georgia agreement predates the new program"
        },
        {
          "type": "paragraph",
          "text": "Georgia Power described the Effingham project on July 22, saying the planned facility was expected to require approximately 3,200 megawatts of power. Its 25-year agreement allows the utility to reduce energy delivered to the site at certain times, with up to 1,000 megawatts of flexible demand response. Those are power figures, measuring the rate of electricity use; they are not the amount of energy a campus would consume over a year."
        },
        {
          "type": "paragraph",
          "text": "Both organizations say OpenAI will pay the infrastructure and electric-service costs needed to serve its facility. Georgia Power’s July account also describes long-term contracts and financial assurances intended to protect other customers. In its new program announcement, OpenAI says similar protections can address the risk that a project is delayed, reduced or canceled. The value of any arrangement still depends on its enforceable terms and the campus delivering the promised flexibility once it operates."
        },
        {
          "type": "heading",
          "text": "Savings projections cover a wider utility portfolio"
        },
        {
          "type": "paragraph",
          "text": "OpenAI cites Georgia Power’s projection of approximately $950 million in annual customer savings beginning in 2029 and a benefit of at least $15 a month for a typical residential customer using 1,000 kilowatt-hours. The utility attributes that projection to its broader portfolio of large-load contracts and expected growth, including the OpenAI project. It is not a measured saving already delivered by Grid Protectors, nor an amount attributable exclusively to one AI campus."
        },
        {
          "type": "paragraph",
          "text": "The economic argument is that steady large-customer demand can help spread grid infrastructure’s fixed costs, while the ability to curtail demand can reduce the capacity needed for infrequent peaks. Turning that argument into customer benefits requires operational flexibility, appropriate cost allocation and actual investment in the grid. OpenAI itself says demand flexibility cannot replace new electricity supply and transmission."
        },
        {
          "type": "paragraph",
          "text": "For communities considering AI infrastructure, the announcement makes the contractual details more consequential than a generic promise of reliable power: the amount of controllable load, response time, duration, cost responsibility and financial protections will determine what a project can contribute. The November 2 launch sets out a national program and an intended Georgia model; it leaves additional local commitments to be finalized and disclosed."
        }
      ],
      "sources": [
        {
          "label": "OpenAI: Grid Protectors announcement, November 2",
          "url": "https://openai.com/index/grid-protectors-program/"
        },
        {
          "label": "Georgia Power: July 22 Effingham agreement and demand-response terms",
          "url": "https://www.georgiapower.com/news-hub/press-releases/georgia-power-to-serve-openai-project-in-effingham-county.html"
        },
        {
          "label": "Georgia Power: approved contract and portfolio-wide savings projection",
          "url": "https://www.georgiapower.com/news-hub/press-releases/contract-openai-approved-part-portfolio-delivering-950-million-annual-savings.html"
        }
      ]
    },
    {
      "slug": "autoware-20-ai-hybrid-planning-open-source-release",
      "category": "Industry",
      "sortDate": "2026-11-02",
      "dateLabel": "November 2, 2026",
      "title": "Autoware 2.0 adds AI and hybrid planning to its open-source driving stack",
      "summary": "The November 2 release introduces selectable trajectory generators, package and model discovery, and reproducible reference designs. The software release does not establish that a vehicle is ready for unrestricted autonomous operation.",
      "image": {
        "src": "ai-news/2026-11/images/autoware-20-official.png",
        "alt": "Official Autoware 2.0 launch artwork with an illustrated autonomous vehicle.",
        "caption": "Original Autoware Foundation promotional artwork for its November 2 release. The vehicle illustration is not evidence of a deployed service or a road-safety result."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "The Autoware Foundation released Autoware 2.0 on November 2, expanding its open-source autonomous-driving software to support end-to-end AI and hybrid approaches alongside conventional rule-based components. The nonprofit’s release combines a new planning architecture with tools for finding packages, managing models and specifying complete system designs. It is available through the project’s GitHub repositories and documentation."
        },
        {
          "type": "paragraph",
          "text": "Autoware traditionally divides a driving system into sensing, perception, localization, planning and control. Its Core layer contains curated libraries, interfaces and APIs, while Universe carries additional algorithms and community contributions. Version 2.0 builds on that structure. The practical change is that developers can evaluate and combine different ways of producing driving trajectories within a shared architecture."
        },
        {
          "type": "heading",
          "text": "Multiple planners can feed a common selector"
        },
        {
          "type": "paragraph",
          "text": "The new generator–selector architecture lets several trajectory generators run in the same system. These can use rule-based robotics, learned models or a mixture of the two. A selector then chooses which candidate trajectory to pass toward vehicle control. The release includes documentation and simulator demonstrations. This makes comparisons and hybrid configurations possible; the announcement does not establish that a learned planner is safer in every environment or that a demonstration proves road readiness."
        },
        {
          "type": "paragraph",
          "text": "Model delivery also moves away from defining every download in one central Ansible file. The Foundation’s Hugging Face organization becomes the default location for its models and datasets, with version control and per-package management. Manifests can still refer to the existing AWF machine-learning server, Amazon S3 or third-party servers. This gives developers a way to track the artifacts associated with particular packages while supporting migration from existing download arrangements."
        },
        {
          "type": "figure",
          "src": "ai-news/2026-11/images/autoware-generator-selector-official.png",
          "alt": "Autoware diagram showing candidate trajectories from multiple generators feeding a selector and vehicle controller.",
          "caption": "Autoware Foundation’s original generator–selector diagram. It describes candidate trajectory selection, not a measured safety guarantee."
        },
        {
          "type": "heading",
          "text": "From individual packages to a reproducible system"
        },
        {
          "type": "paragraph",
          "text": "Autoware Index provides a registry of compatible repositories and reference designs. Its command-line tool can select individual packages or a complete design together with dependencies and write the resulting workspace specification. Contributors retain ownership of their repositories. The Foundation says five Universe packages have moved to their own repositories in the Index, and AI inference and end-to-end packages are included in its discovery system."
        },
        {
          "type": "paragraph",
          "text": "The Reference Design framework describes a complete configuration as a deployment profile plus a reference software stack. The profile records the vehicle, sensors, compute and intended operating conditions. The software stack fixes modules, model versions, parameters and interfaces. Combining the two creates a documented system that other developers can reproduce and evaluate, with its intended capabilities distinguished from demonstrated results."
        },
        {
          "type": "paragraph",
          "text": "TIER IV separately announced work with the Foundation and the wider ecosystem, identifying Arm computing platforms, AWS development and operations environments, and integration with Red Hat’s AutoSD as areas it intends to advance. These are commercialization and integration efforts, rather than evidence that all proposed vehicle configurations have been deployed."
        },
        {
          "type": "paragraph",
          "text": "The release is useful for organizations that need to compare learned and conventional driving systems without assembling every integration mechanism themselves. A package registry and a reproducible design can clarify what was tested, but they do not remove the need to validate sensors, compute, operating limits and vehicle behavior for a particular deployment."
        }
      ],
      "sources": [
        {
          "label": "Autoware Foundation: November 2 release and architecture",
          "url": "https://autoware.org/autoware-foundation-releases-autoware-2-0-to-expand-ai-support-for-open-source-autonomous-driving/"
        },
        {
          "label": "Autoware: official software repository",
          "url": "https://github.com/autowarefoundation/autoware"
        },
        {
          "label": "Autoware: official Index CLI",
          "url": "https://github.com/autowarefoundation/aw-index-cli"
        },
        {
          "label": "TIER IV: November 2 ecosystem initiatives",
          "url": "https://tier4.co.jp/en/updates/press-release/20261102-tieriv-spearheads-autoware2.0-initiatives"
        }
      ]
    },
    {
      "slug": "pathlupi-journal-study-genomic-supervision-histology",
      "category": "Research",
      "sortDate": "2026-11-02",
      "dateLabel": "November 2, 2026",
      "title": "PathLUPI study uses molecular training signals to improve slide-only cancer predictions",
      "summary": "Published in Nature Communications on November 2, the retrospective study evaluates 11,361 cases across 20 cohorts. Its journal version is distinct from the June 2025 preprint, and the results do not establish a replacement for molecular testing.",
      "image": {
        "src": "ai-news/2026-11/images/hkust-official-logo.svg",
        "alt": "Official Hong Kong University of Science and Technology wordmark.",
        "caption": "Official HKUST wordmark, identifying an institution involved in the PathLUPI research. Clinical validation remains separate from the journal publication."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "Nature Communications published a study of PathLUPI on November 2, describing a way to improve cancer-related predictions from routine pathology slides by using molecular information during training. Researchers led by collaborators at the Hong Kong University of Science and Technology and Sun Yat-sen University evaluated the framework on 49 molecular-oncology tasks using 11,361 cases across 20 cohorts. The new milestone is journal publication; an earlier preprint was submitted in June 2025."
        },
        {
          "type": "paragraph",
          "text": "PathLUPI addresses a practical distinction between training and use. A research dataset may contain both a tissue image and a matched gene-expression profile, while a hospital considering a new slide may not yet have sequencing results. The framework uses those paired molecular measurements to teach the model during training, then generates predictions from whole-slide images alone at inference."
        },
        {
          "type": "heading",
          "text": "Molecular supervision shapes the image representation"
        },
        {
          "type": "paragraph",
          "text": "The training system has two branches. One receives pathology-image features and gene-expression information organized into biological pathways. The other sees the image features without the actual molecular profile and learns to approximate the first branch’s representations and attention patterns. Only that second branch is used for slide-only predictions. The main experiments use frozen features from the CONCH pathology foundation model, with comparisons against four image-only approaches: ABMIL, CLAM, DTFD and TransMIL."
        },
        {
          "type": "paragraph",
          "text": "The internal dataset contains 6,427 cases across 13 cancer cohorts from The Cancer Genome Atlas. External evaluation uses 4,934 cases from seven cohorts, including surgical specimens, core-needle biopsies and public datasets. The study covers biomarker prediction, molecular subtyping and survival prognosis. Models use patient-level, five-fold cross-validation; the authors report using the same splits and image features for their principal baselines."
        },
        {
          "type": "heading",
          "text": "Performance varies substantially across settings"
        },
        {
          "type": "paragraph",
          "text": "One example shows why internal and external results must remain separate. For predicting BRAF mutation status in colorectal cancer, PathLUPI achieved an internal area under the receiver operating characteristic curve, or AUC, of 0.840, while its external AUC was 0.655. It improved on the best reported comparator in both settings, but the lower external result demonstrates the challenge of transferring predictions to a different cohort. AUC measures discrimination across thresholds; it is not the fraction of patients correctly diagnosed at a chosen clinical cutoff."
        },
        {
          "type": "figure",
          "src": "ai-news/2026-11/images/pathlupi-biomarker-figure2.png",
          "alt": "Original PathLUPI Figure 2 comparing biomarker AUC and ROC curves across internal and external cohorts.",
          "caption": "Jin et al., Figure 2, reproduced unchanged under CC BY-NC-ND 4.0. Asterisks mark external cohorts; bars show AUC with 95% confidence intervals, not diagnostic accuracy. Open the image to inspect all task labels."
        },
        {
          "type": "paragraph",
          "text": "The authors also tested different image-feature backbones and examined whether learned attention patterns aligned with molecular signals in selected spatial-transcriptomics samples. Those analyses provide evidence about the method’s behavior, with limits: the spatial checks cover representative cases, and several actionable biomarkers still lack independent external validation. Results across individual cancer types and tasks are not interchangeable."
        },
        {
          "type": "paragraph",
          "text": "The study is retrospective, using previously collected and de-identified data. It does not report a prospective trial showing that PathLUPI improves treatment decisions or patient outcomes. Its training still depends on scarce paired slide and transcriptomic data, and the authors identify probability calibration, validation in target populations and broader multicenter testing as work needed before clinical translation."
        },
        {
          "type": "paragraph",
          "text": "The published paper links to an MIT-licensed code repository, which provides a starting point for research reproduction rather than a clinically validated service. The contribution is evidence that molecular knowledge can improve what an image-only model learns while keeping molecular measurements out of its inference inputs. That is a research result about representation learning and prediction, with clinical deployment still requiring further evidence."
        }
      ],
      "sources": [
        {
          "label": "Nature Communications: November 2 journal publication",
          "url": "https://www.nature.com/articles/s41467-026-78947-2"
        },
        {
          "label": "Nature Communications: reviewed 15-page journal-version PDF",
          "url": "https://www.nature.com/articles/s41467-026-78947-2_reference.pdf"
        },
        {
          "label": "arXiv: earlier June 24, 2025 preprint and version history",
          "url": "https://arxiv.org/abs/2506.19681"
        },
        {
          "label": "PathLUPI: official implementation and licensing",
          "url": "https://github.com/ChengJin-git/PathLUPI"
        },
        {
          "label": "Article licence: CC BY-NC-ND 4.0",
          "url": "https://creativecommons.org/licenses/by-nc-nd/4.0/"
        }
      ]
    },
    {
      "slug": "context-labs-ai-distillery-sovereign-enterprise-data-launch",
      "category": "Industry",
      "sortDate": "2026-11-01",
      "dateLabel": "November 1, 2026",
      "title": "Context Labs launches AI Distillery for governed enterprise data",
      "summary": "The November 1 release packages operational data, meaning and provenance for use with different AI models. The company says it is available through Microsoft Marketplace; measured customer savings are not disclosed.",
      "image": {
        "src": "ai-news/2026-11/images/context-labs-distillery-official.png",
        "alt": "Context Labs launch artwork announcing AI Distillery on November 1, 2026.",
        "caption": "Original Context Labs promotional artwork for its November 1 AI Distillery announcement. It is not a screenshot of the product or evidence of measured customer results."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "Context Labs announced AI Distillery on November 1 in Abu Dhabi, introducing software that organizes an enterprise’s operational and business records into a governed package for AI applications. The company says the product can run inside a customer’s data center or chosen cloud and work with frontier or open-weight models. It describes availability through Microsoft Marketplace, with an industry starter kit included in each enterprise license."
        },
        {
          "type": "paragraph",
          "text": "The product addresses the work required before a model can answer a company-specific question reliably: records from different systems need consistent definitions, ownership rules, permissions and a traceable origin. Context Labs calls the resulting artifact a Context Package. The announcement presents it as an asset controlled by the enterprise, carrying its information and the rules that explain how that information should be used."
        },
        {
          "type": "heading",
          "text": "A package contains meaning as well as records"
        },
        {
          "type": "paragraph",
          "text": "The workflow has three stages. First, the software extracts, profiles and validates structured and unstructured data and maps it to an industry-specific ontology—a model of the entities and relationships in the business. The product page describes a person participating in schema discovery and refinement. Data provenance records where information originated, when it entered the system and how it was processed."
        },
        {
          "type": "paragraph",
          "text": "The next stage combines these outputs into a package containing operational data, business metrics, governance policies and the concept map. Context Labs says cryptographic provenance supports the record of origin. In the final stage, authorization limits which information an AI model can access, while responses are checked against the package’s ontology. These mechanisms are intended to make an answer auditable; a record of provenance does not by itself prove that the underlying data or an AI interpretation is correct."
        },
        {
          "type": "heading",
          "text": "Model choice and deployment remain enterprise decisions"
        },
        {
          "type": "paragraph",
          "text": "Context Agents are the company’s interface for operational, commercial and compliance questions. Its Semantic Context Tunnel is intended to bring the same governed context into assistants that employees already use. The product page describes connections through MCP or A2A and gives Claude and Copilot as examples. The proposed benefit is to reuse the data model when changing AI systems, instead of reconstructing the company’s business context for each provider."
        },
        {
          "type": "paragraph",
          "text": "Context Labs also says enterprise knowledge in the package is not used to train third-party models and that access controls remain under the customer’s authority. Those are product and deployment commitments that buyers would need to assess against their chosen configuration and contract. The release does not publish enterprise pricing, a comprehensive model-compatibility test or an independent security evaluation."
        },
        {
          "type": "paragraph",
          "text": "At ADIPEC, the company is demonstrating energy-sector use cases in which agents answer questions using plant records. That provides the stated application setting, rather than evidence that the product has already achieved a particular accuracy improvement or cost reduction across customer operations. The company argues that organized context can reduce token use, but supplies no quantitative comparison establishing the size of such savings."
        },
        {
          "type": "paragraph",
          "text": "The launch puts the focus on an enterprise layer around AI: defining data, controlling access and preserving the information needed to investigate an answer. Its practical value will depend on how well those controls and mappings work with a customer’s real systems. The November 1 announcement establishes the product offering and described workflow, while leaving performance and implementation economics to be demonstrated."
        }
      ],
      "sources": [
        {
          "label": "Context Labs: dated November 1 launch announcement",
          "url": "https://contextlabs.com/context-labs-ai-distillery-press/"
        },
        {
          "label": "Context Labs: product workflow, architecture and model interfaces",
          "url": "https://contextlabs.com/distillery/"
        }
      ]
    },
    {
      "slug": "ai-human-jobs-november-non-engineering-openings-report",
      "category": "Employment / Talent",
      "sortDate": "2026-11-01",
      "dateLabel": "November 1, 2026",
      "title": "November report tracks 1,380 non-engineering openings at 34 AI companies",
      "summary": "AI Human Jobs’ November 1 snapshot describes advertised roles in operations, content, policy, support and AI training. Its limited company sample and short comparison window do not measure realized hiring or the whole labor market.",
      "image": {
        "src": "ai-news/2026-11/images/ai-human-jobs-source-cover.png",
        "alt": "AI Human Jobs wordmark and description of its non-coding job categories.",
        "caption": "Original AI Human Jobs site artwork. This article reports the fixed November 1 snapshot, rather than the site’s later daily listing totals."
      },
      "content": [
        {
          "type": "paragraph",
          "text": "AI Human Jobs published its first monthly jobs report on November 1, counting 1,380 listed non-engineering roles across 34 AI companies. The snapshot focuses on work such as operations, sales, content, policy, support and model training, rather than software-engineering vacancies. Of the listed roles, 572, or about 41%, were marked remote. These are observations of advertised opportunities in the publisher’s selected company sample, not a count of people hired."
        },
        {
          "type": "paragraph",
          "text": "The report describes collecting employers’ own public job boards on Greenhouse, Ashby, Lever, Workable and Recruitee, alongside thirteen hand-checked ongoing AI-training programs. It filters engineering, research and data-science titles out of its main population. Because classification uses job titles, the publisher acknowledges that some records can be categorized imperfectly. An ongoing freelance program also represents a different kind of opportunity from one fixed salaried vacancy."
        },
        {
          "type": "heading",
          "text": "Non-engineering work spans several overlapping categories"
        },
        {
          "type": "paragraph",
          "text": "Operations, sales and people functions account for 759 listings in the report. Content, writing and design account for 251; AI tutor and training work for 211; language and voice for 184; policy, safety and legal for 160; and support and customer success for 107. A role can belong to more than one category, so adding those figures would overstate the number of distinct listings."
        },
        {
          "type": "paragraph",
          "text": "The three largest company counts are Anthropic with 260 roles, Harvey with 197 and OpenAI with 195. Together they account for 652 of the 1,380 listings, about 47% of the sample. That concentration is one reason the report cannot be treated as a representative survey of all employers using AI or of the wider economy. Its remote label also does not remove country, residency or other restrictions in an individual employer’s posting."
        },
        {
          "type": "heading",
          "text": "Posted pay is a selected subset"
        },
        {
          "type": "paragraph",
          "text": "The publisher found employer-posted compensation for 847 listings, about 61% of the total. Among 722 listings with an annual U.S.-dollar range, the median lower bound was $205,000 and the median upper bound was $260,000. Those are medians of advertised range endpoints, rather than average earnings or a salary that a typical applicant can expect. For sales positions, a posted figure can include on-target earnings and commission."
        },
        {
          "type": "paragraph",
          "text": "Hourly and project work require separate treatment. The report identifies 33 AI tutor and training listings with hourly U.S.-dollar rates, with median advertised endpoints of $35 and $45 an hour. The much smaller annual-salary subset for that category cannot describe compensation for its whole population. The report also retains per-task amounts and other currencies separately."
        },
        {
          "type": "paragraph",
          "text": "Its comparison begins on October 16, the site’s earliest saved full build, so it covers roughly two weeks rather than a full month. Records newly appearing since that snapshot are not necessarily newly created jobs, and a listing disappearing does not establish that someone was hired. The report explicitly identifies an unavailable Abaka AI board as missing access, rather than evidence that the company has no openings."
        },
        {
          "type": "paragraph",
          "text": "For readers exploring work around AI, the report supplies a dated map of roles beyond engineering and links onward to employers. It does not establish a hiring boom, a talent shortage or a change in realized wages. The November 1 report is the relevant fixed snapshot; the site’s daily job list can subsequently change and should not be substituted for those reported counts."
        }
      ],
      "sources": [
        {
          "label": "AI Human Jobs: November report, population and methodology",
          "url": "https://aihumanjobs.com/reports/2026-11/"
        },
        {
          "label": "AI Human Jobs: downloadable November 1 report data",
          "url": "https://aihumanjobs.com/reports/2026-11.json"
        },
        {
          "label": "AI Human Jobs: collection approach and category definitions",
          "url": "https://aihumanjobs.com/about/"
        }
      ]
    }
  ]
};
