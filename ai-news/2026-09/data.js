/**
 * AI News — September 2026
 *
 * Keep one record per story. Daily reports and weekly analysis use the same
 * schema and the shared renderer. To add a story, copy an article object,
 * give it a unique slug, and place its images in this month's images folder.
 * Use sortDate (YYYY-MM-DD) to control reverse-chronological ordering.
 */
window.AI_NEWS_MONTH_DATA = window.AI_NEWS_MONTH_DATA || {};
window.AI_NEWS_MONTH_DATA["2026-09"] = {
  label: "September 2026",
  articles: [
    {
      slug: "apxinf-robot-runtime",
      category: "Robotics · Open Source",
      sortDate: "2026-09-15",
      dateLabel: "September 15, 2026",
      title: "APXInf puts robot inference on the clock: π0.5 at 41 milliseconds on Thor",
      summary: "Infinigence, Tsinghua, and Shanghai Jiao Tong introduce an edge runtime that packages model execution and the steps needed to connect it to a robot.",
      image: {
        src: "ai-news/2026-09/images/apxinf-logo.png",
        alt: "APXInf project logo",
        caption: "APXInf project logo. Source: official project repository."
      },
      content: [
        {
          type: "paragraph",
          text: "41.16 milliseconds, or about 24 inferences a second. That is the π0.5 result APXInf reports for its FP8 configuration on Nvidia's Jetson AGX Thor."
        },
        {
          type: "paragraph",
          text: "A person waiting for a chatbot can take a sip of coffee. A robot reaching for an object needs its next calculation to keep pace with its movement. On September 15, Infinigence, Tsinghua University, and Shanghai Jiao Tong University announced APXInf, an open-source robot edge-inference project. Its code is available in the RLinf community's APXinf-robo repository."
        },
        {
          type: "paragraph",
          text: "The first supported models include Physical Intelligence's π0.5. These models combine camera views, instructions, and the robot's current state to produce actions. APXInf packages the computation needed to run that process on local hardware."
        },
        {
          type: "paragraph",
          text: "The Python interface accepts raw images and instructions. Image resizing, text processing, state normalization, and action sampling can run within the same policy pipeline, which returns actions alongside timing information. Teams already using OpenPI can connect through a compatible WebSocket service, while a local interface supports direct deployment on the robot."
        },
        {
          type: "paragraph",
          text: "The repository includes configuration entry points for Franka/LIBERO and Unitree G1. These provide starting points for particular robots or test environments. The runtime is written in Rust, with Python interfaces for integration into research workflows."
        },
        {
          type: "paragraph",
          text: "In the published Thor setup, BF16 inference takes 72.45 milliseconds; FP8 reduces that to 41.16 milliseconds. The corresponding rates are 13.8 and 24.3 Hz. The benchmark uses two 224 × 224 image views, a batch size of one, and ten sampling steps, and it measures steady-state model inference."
        },
        {
          type: "figure",
          src: "ai-news/2026-09/images/apxinf-latency.png",
          alt: "Bar chart comparing APXInf π0.5 inference latency on Nvidia Jetson AGX Thor",
          caption: "Project-reported steady-state π0.5 inference latency on Thor; two image views, batch size one, and ten sampling steps."
        },
        {
          type: "paragraph",
          text: "The older Jetson AGX Orin is supported too. Its reported π0.5 BF16 result is 165.67 milliseconds, about six inferences a second. The repository also lists desktop RTX 4090 configurations, giving teams routes for both development hardware and onboard devices."
        },
        {
          type: "paragraph",
          text: "Alongside timing, the project publishes task results. In LIBERO-10 simulation, the Thor BF16 configuration completes 464 of 500 episodes, while FP8 completes 461: success rates of 92.8% and 92.2%. In that setup, the faster configuration retains a similar task-completion rate."
        },
        {
          type: "heading",
          text: "An AI assistant for the porting work"
        },
        {
          type: "paragraph",
          text: "APXInf also supplies a workflow for coding agents. Developers specify a model, target hardware, precision, and acceptance criteria, then use the project's guides to work through model porting and kernel optimization."
        },
        {
          type: "paragraph",
          text: "There is a useful division of labor here: one model decides how a robot should move; another AI helps prepare the code that lets it run. Separate guides cover new models, existing-model ports, and kernel work."
        }
      ],
      sources: [
        {
          label: "Infinigence announcement, republished by QbitAI, September 15",
          url: "https://www.qbitai.com/2026/09/489460.html"
        },
        {
          label: "APXinf-robo official runtime and benchmark documentation",
          url: "https://github.com/RLinf/APXinf-robo"
        }
      ]
    },
    {
      slug: "claude-financial-advisors",
      category: "AI Applications · Financial Services",
      sortDate: "2026-09-14",
      dateLabel: "September 14, 2026",
      title: "Claude gets another job: gathering the files for financial advisors",
      summary: "Schwab, BlackRock, and other partners connect client records and investment information to a new bundle of advisor tools, from meeting briefs to follow-up drafts.",
      image: {
        src: "ai-news/2026-09/images/claude-financial-advisors.jpg",
        alt: "Official Claude for Financial Advisors announcement artwork",
        caption: "Official Claude for Financial Advisors announcement artwork. Source: Anthropic."
      },
      content: [
        {
          type: "paragraph",
          text: "Claude has another job title: assistant to the financial advisor."
        },
        {
          type: "paragraph",
          text: "Anthropic launched Claude for Financial Advisors on September 14 with partners including Charles Schwab, BlackRock, and Vanguard. The assignment is specific: gather records from the tools advisors already use, prepare meeting material, and draft the follow-up."
        },
        {
          type: "paragraph",
          text: "Schwab announced the partnership separately. It serves more than 16,000 independent registered investment advisor firms, and the connection gives advisors a way to access Schwab Advisor Center data through Claude. Balances, holdings, transactions, cost basis, and money-movement status are among the information covered."
        },
        {
          type: "paragraph",
          text: "The tools connect to an advisor's existing software. Schwab supplies custodial data; Wealthbox brings client records and meeting history; Orion connects portfolio reporting and CRM information; and Zocks contributes goals, life events, and commitments captured in conversations."
        },
        {
          type: "paragraph",
          text: "That can place several ingredients into one pre-meeting brief: what the client owns, what has happened in the account, and what was left open last time. After a meeting, another workflow turns a transcript into a client summary, recap email, and draft CRM tasks. Client communications and consequential actions remain subject to the advisor's approval."
        },
        {
          type: "figure",
          src: "ai-news/2026-09/images/claude-advisor-workflow.svg",
          alt: "Diagram of preparation, follow-up, and advisor approval in a financial advisory workflow",
          caption: "Preparation, follow-up, and advisor approval, illustrated from the official product description."
        },
        {
          type: "paragraph",
          text: "The bundle also covers document-heavy planning work. Wealth.com connects estate and tax information. Portfolio-review tools can flag drift from target allocations and concentrated positions, then draft an explanation. Alternative-investment briefs can gather commitments and recent activity from systems such as iCapital or Addepar."
        },
        {
          type: "paragraph",
          text: "BlackRock brings model portfolios and institutional portfolio analytics into the mix. Vanguard supplies model-portfolio information, investment solutions, and asset-allocation research. SS&C Black Diamond covers performance, holdings, and rebalancing data, while Envestnet adds Tamarac account summaries and a MoneyGuide financial-plan snapshot."
        },
        {
          type: "paragraph",
          text: "The plugin became available on September 14. Firms with an Enterprise license can find Claude for Financial Advisors in Cowork's plugin browser, connect their systems, and adapt the skills to their own service model and writing style."
        }
      ],
      sources: [
        {
          label: "Anthropic — Claude for Financial Advisors, September 14",
          url: "https://claude.com/blog/claude-for-financial-advisors"
        },
        {
          label: "Charles Schwab — Official partnership announcement, September 14",
          url: "https://pressroom.aboutschwab.com/press-releases/press-release/2026/Charles-Schwab-and-Anthropic-to-Bring-Claude-to-Independent-Registered-Investment-Advisors/default.aspx"
        }
      ]
    },
    {
      slug: "modalens-xray-swap",
      category: "Frontier Research · Medical AI",
      sortDate: "2026-09-14",
      dateLabel: "September 14, 2026",
      title: "The X-ray was swapped. Why did the AI stick with its answer?",
      summary: "ModaLens holds the question and report fixed while changing the image. Removing the report makes the model substantially more likely to change its answer.",
      image: {
        src: "ai-news/2026-09/images/modalens-paper-excerpt.png",
        alt: "Excerpt from the ModaLens paper describing the image-swap analysis",
        caption: "Excerpt from ModaLens section 4.1, reflowed from the paper's HTML. Cajas Ordóñez et al., CC BY 4.0."
      },
      content: [
        {
          type: "paragraph",
          text: "The question stayed the same. So did the radiology report. The chest X-ray was replaced."
        },
        {
          type: "paragraph",
          text: "When researchers tried that swap on a medical AI model, the result depended heavily on whether the report was still present. With the text alongside the image, the model usually retained its answer. Remove the report, and answers changed much more often."
        },
        {
          type: "paragraph",
          text: "ModaLens, a preprint released on September 14 by a team including MIT Critical Data researchers, examines how images and reports influence a medical vision-language model. Its main experiments use MedGemma-27B."
        },
        {
          type: "paragraph",
          text: "The study uses 3,199 paired cases from 293 patients. Each case includes an original chest X-ray and a substitute; the vast majority of substitutes come from another examination of the same patient. The question and report remain fixed during the swap, allowing researchers to compare answers while isolating the image change."
        },
        {
          type: "paragraph",
          text: "The questions concern findings on chest X-rays, with an explicit Yes/No response format. In the authors' 13-finding analysis, image swaps change the answer on 4.42% of trials with a report present. Without the report, that rises to 19.93%, a difference of about 15.5 percentage points."
        },
        {
          type: "figure",
          src: "ai-news/2026-09/images/modalens-results.png",
          alt: "Chart showing answer-change rates after image substitution in the ModaLens analysis",
          caption: "Answer-change rates after image substitution in the 13-finding analysis. Data: ModaLens section 4.1."
        },
        {
          type: "paragraph",
          text: "These percentages measure answer changes after an image swap, rather than diagnostic accuracy. Within the experiment, they show how much more stable the final answer becomes when the report accompanies the image."
        },
        {
          type: "heading",
          text: "Would any extra text do it?"
        },
        {
          type: "paragraph",
          text: "The team varied the text to test whether adding words simply crowded out the image. Reports containing information about the findings suppressed image-swap sensitivity more strongly than neutral text, suggesting that the content of the words mattered."
        },
        {
          type: "paragraph",
          text: "The researchers also removed report sentences that directly mentioned the finding in the question. In a supplementary one-question-per-case experiment, the answer-change rate reached 11.6% after those sentences were removed, compared with about 1.4% with the full report."
        },
        {
          type: "paragraph",
          text: "Experiments extended to Qwen3.5-9B, Qwen3.5-27B, and LLaVA-NeXT built on Mistral-7B, with the report effect pointing in the same direction. Switching model families did not make the pattern disappear."
        },
        {
          type: "heading",
          text: "What if the prompt tells it to double-check?"
        },
        {
          type: "paragraph",
          text: "The researchers warned the model that the report might be incorrect and told it to inspect the image. In a single-question control, that instruction did not substantially remove the report's effect. An extra reminder was not enough to change the pattern."
        },
        {
          type: "paragraph",
          text: "They then blocked attention to report tokens from selected layers. Starting the block at earlier layers increased image-swap sensitivity; starting later left it close to baseline. The authors also note that an unchanged Yes/No response does not mean the image had no effect: the model's preference can move without crossing the threshold that changes the final answer."
        },
        {
          type: "paragraph",
          text: "ModaLens publishes code, prompts, and run records. A simple intervention — replacing the image — leads through experiments on text content, instructions, and the model's internal computation."
        }
      ],
      sources: [
        {
          label: "Cajas Ordóñez et al. — ModaLens, arXiv v1, September 14",
          url: "https://arxiv.org/html/2609.15635v1"
        },
        {
          label: "MIT Critical Data — ModaLens code and run records",
          url: "https://github.com/criticaldata/MODALENS"
        }
      ]
    },
    {
      slug: "weekly-ai-september-07-13",
      category: "AI Weekly · September 7–13",
      sortDate: "2026-09-13",
      dateLabel: "September 7–13, 2026",
      title: "AI Weekly: DeepSeek's new architecture, OpenAI's talking API, and Z.AI's HK$39 billion plan",
      summary: "A week of model releases, voice tools, coding agents, music deals, and major financing — plus a 7B research team opening its training recipe.",
      image: {
        src: "ai-news/2026-09/images/deepseek-architecture.png",
        alt: "DeepSeek chart comparing KV cache sizes across model generations",
        caption: "DeepSeek's published comparison of KV cache sizes across model generations. Source: DeepSeek."
      },
      content: [
        {
          type: "paragraph",
          text: "This week's AI announcements stretched from model architecture to music licensing and a multibillion-dollar financing plan. DeepSeek released V4.1-Flash, OpenAI opened its full-duplex voice model to API developers, and Cursor introduced Projects. Universal Music Group signed a multiyear agreement with ElevenLabs, Z.AI outlined roughly HK$39.3 billion in financing, and a Zhongguancun research team released the materials behind a 7B model."
        },
        {
          type: "figure",
          src: "ai-news/2026-09/images/weekly-ai-poster.png",
          alt: "UGA LLM Lab poster summarizing five major AI stories from September 7 through September 13, 2026",
          caption: "Five major AI stories from September 7–13, 2026. Open the image to view the full-size poster."
        },
        {
          type: "heading",
          text: "DeepSeek keeps the Flash name and changes the architecture"
        },
        {
          type: "paragraph",
          text: "DeepSeek released V4.1-Flash on September 10 with native visual understanding and open weights. Its asymmetric causal encoder-decoder architecture has 552 billion total parameters, activating about 8 billion for input and 16 billion for output."
        },
        {
          type: "paragraph",
          text: "The design separates the computational roles of reading and generating. DeepSeek reports that the new model requires one-quarter of the previous generation's HBM and one-eighth of its SSD storage for the KV cache. The model is available through the DeepSeek API, with peak and off-peak pricing retained at launch."
        },
        {
          type: "heading",
          text: "OpenAI's voice AI learns when to speak — and when to wait"
        },
        {
          type: "paragraph",
          text: "OpenAI launched GPT-Live-1 in the API on September 10. It processes incoming and outgoing audio together, handling interruptions, pauses, and changes of mind while delegating deeper reasoning or tool calls to a backend model."
        },
        {
          type: "paragraph",
          text: "In early results cited in the announcement, language-learning company Speak reported almost 80% fewer interruptions during learners' thinking pauses than with its previous turn-based systems. Developers can customize tone, pace, and style and choose a backend reasoning model."
        },
        {
          type: "heading",
          text: "Cursor gives the conversation a project home"
        },
        {
          type: "paragraph",
          text: "Cursor introduced Projects on September 10, beginning a beta rollout. Projects preserve shared context, use a coordinator to delegate work, and support subscriptions that can trigger continued activity. The feature organizes longer development work around persistent context rather than one isolated assignment."
        },
        {
          type: "heading",
          text: "ElevenLabs and Universal Music sign a long-term agreement"
        },
        {
          type: "paragraph",
          text: "On September 10, ElevenLabs announced a multiyear licensing and strategic agreement with Universal Music Group. They plan AI audio products and a fan-facing creation platform built around licensed music and participating artists and songwriters. The agreement is signed; the platform is still being developed, without an announced launch date."
        },
        {
          type: "heading",
          text: "Z.AI plans HK$39.3 billion in financing"
        },
        {
          type: "paragraph",
          text: "In a September 13 announcement, Z.AI detailed a share placement and zero-coupon convertible bonds expected to raise combined net proceeds of about HK$39.27 billion. The agreements were signed on September 12, with completion subject to conditions."
        },
        {
          type: "paragraph",
          text: "The proposed allocation is 60% for next-generation GLM development, Fully Self Training, and training and production-inference infrastructure; 15% for expansion, strategic investments, and acquisitions; and 25% for the capital structure, working capital, and general corporate purposes."
        },
        {
          type: "figure",
          src: "ai-news/2026-09/images/zai-filing-excerpt.png",
          alt: "Excerpt from page 20 of Z.AI's September 13 financing filing",
          caption: "Z.AI filing excerpt describing expected proceeds from the placement and convertible bonds."
        },
        {
          type: "heading",
          text: "ZGCM-1 opens the kitchen behind a 7B model"
        },
        {
          type: "paragraph",
          text: "A team from Zhongguancun Academy and the Zhongguancun Institute of Artificial Intelligence released the ZGCM-1 technical report on September 11. The roughly 7.39-billion-parameter dense model is trained from scratch for mathematical reasoning and agentic search, with a 256K context."
        },
        {
          type: "paragraph",
          text: "The release includes weights from pretraining, mid-training, and post-training; intermediate checkpoints; code; stage-specific data and recipes; and training logs. The report also describes research agents helping with data processing, experiment monitoring, evaluation, and deployment."
        },
        {
          type: "paragraph",
          text: "Its design interleaves sliding-window and global attention and combines FP8 training with Muon and other optimizations. In a 16K-context pretraining comparison, the authors report roughly a 4.2-fold improvement in time to the same loss."
        }
      ],
      sources: [
        {
          label: "DeepSeek — V4.1-Flash announcement, September 10",
          url: "https://www.deepseek.com/en/news/deepseek-v4-1-flash/"
        },
        {
          label: "DeepSeek — V4.1-Flash model card",
          url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"
        },
        {
          label: "OpenAI — GPT-Live-1 API announcement, September 10",
          url: "https://openai.com/index/introducing-gpt-live-1-in-the-api/"
        },
        {
          label: "Cursor — Introducing Projects, September 10",
          url: "https://cursor.com/blog/projects"
        },
        {
          label: "ElevenLabs — Universal Music Group agreement, September 10",
          url: "https://elevenlabs.io/blog/umg"
        },
        {
          label: "Z.AI — Financing announcement, September 13",
          url: "https://ea-cdn.eurolandir.com/press-releases-attachments/4179721/HKEX-EPS_20260913_12330384_0.PDF"
        },
        {
          label: "ZGCM Team — ZGCM-1 technical report, September 11",
          url: "https://arxiv.org/html/2609.13356v1"
        },
        {
          label: "Zhongguancun Academy / ZGCAI — ZGCM-1 repository",
          url: "https://github.com/zgcagi/ZGCM-1"
        }
      ]
    }
  ]
};
