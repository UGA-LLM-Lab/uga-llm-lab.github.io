/**
 * UGA LLM Lab content store
 *
 * Edit this file for routine content changes. The shared renderer in site.js
 * turns these records into navigation, news, member, research, publication,
 * and opportunity sections across the site.
 */
window.LLM_LAB_DATA = {
  site: {
    name: "UGA LLM Lab",
    sponsorName: "GyriQAI, Inc",
    sponsorUrl: "https://ezcollegeapp.com/",
    ugaUrl: "https://www.uga.edu/",
    computingUrl: "https://computing.uga.edu/",
    contactEmail: "tliu@uga.edu",
    designerName: "Siyuan Li",
    designerUrl: "https://siyuanli.tech/"
  },

  navigation: [
    { id: "home", label: "Home", href: "index.html" },
    { id: "members", label: "Members", href: "members.html" },
    { id: "research", label: "Research", href: "research.html" },
    {
      id: "opportunities",
      label: "Opportunities",
      children: [
        { id: "high-school", label: "High School", href: "opportunities-high-school.html" },
        { id: "undergraduate", label: "Undergraduate", href: "opportunities-undergraduate.html" },
        { id: "masters", label: "Master’s", href: "opportunities-masters.html" },
        { id: "phd", label: "Ph.D.", href: "opportunities-phd.html" }
      ]
    },
    {
      id: "ezcollegeapp",
      label: "EZCollegeApp",
      href: "ezcollegeapp.html",
      logo: "assets/images/ezcollegeapp-wordmark-nav.png"
    }
  ],

  home: {
    summary: "We study large language models as a foundation for general intelligence, quantum computing as a path to scalable AI, and the human brain as a blueprint for learning and reasoning.",
    mission: [
      "Develop language-based intelligent systems that can reason across domains, learn from multimodal evidence, and collaborate with people.",
      "Connect advances in AI, neuroscience, and quantum computing to research problems in science, medicine, education, and the humanities.",
      "Train researchers who can move between foundational methods and applications with measurable social value."
    ]
  },

  news: [
    {
      date: "July 2026",
      sortDate: "2026-07",
      category: "Publication",
      title: "Synapse appears in Findings of ACL 2026",
      excerpt: "A unified episodic-semantic memory architecture for LLM agents using spreading activation for temporal and multi-hop reasoning.",
      url: "https://aclanthology.org/2026.findings-acl.1108/",
      image: "assets/images/news-synapse.png",
      imageAlt: "Figure from the Synapse paper showing its episodic-semantic memory architecture"
    },
    {
      date: "June 2026",
      sortDate: "2026-06",
      category: "Publication",
      title: "Review of large language models for manufacturing published",
      excerpt: "The review surveys LLM applications across design, quality control, robotics, supply chains, education, and knowledge systems.",
      url: "https://www.sciencedirect.com/science/article/pii/S0278612526000439",
      image: "assets/images/news-manufacturing.png",
      imageAlt: "Figure from the paper mapping large language model applications in manufacturing"
    },
    {
      date: "April 2026",
      sortDate: "2026-04",
      category: "Publication",
      title: "MEDQUA presented at IEEE ISBI 2026",
      excerpt: "The NISQ-aware quantum adapter combines a sparse quantum bottleneck with a stable classical path for medical vision-language models.",
      url: "https://doi.org/10.1109/ISBI61048.2026.11515966",
      image: "assets/images/news-medqua.png",
      imageAlt: "Figure from the MEDQUA paper showing its quantum adapter architecture"
    },
    {
      date: "January 2026",
      sortDate: "2026-01",
      category: "Preprint",
      title: "EZCollegeApp system paper released",
      excerpt: "The paper describes a human-supervised, mapping-first system for grounded assistance across American college application workflows.",
      url: "https://arxiv.org/abs/2602.15850",
      image: "assets/images/news-ezcollegeapp-architecture.jpg",
      imageAlt: "Figure from the EZCollegeApp paper showing the platform architecture and workflow"
    },
    {
      date: "November 2025",
      sortDate: "2025-11",
      category: "Publication",
      title: "HELENE published at EMNLP 2025",
      excerpt: "HELENE accelerates zeroth-order fine-tuning of large language models through layer-wise clipping and gradient annealing.",
      url: "https://aclanthology.org/2025.emnlp-main.1323/",
      image: "assets/images/news-helene.png",
      imageAlt: "Figure from the HELENE paper comparing optimizer behavior on a toy objective"
    },
    {
      date: "August 2024",
      sortDate: "2024-08",
      category: "Publication",
      title: "BiomedGPT published in Nature Medicine",
      excerpt: "The generalist vision-language foundation model supports diverse biomedical tasks across modalities and data scales.",
      url: "https://www.nature.com/articles/s41591-024-03185-2",
      image: "assets/images/news-biomedgpt.png",
      imageAlt: "Figure from the BiomedGPT paper showing supported biomedical modalities and tasks"
    }
  ],

  memberGroups: [
    {
      id: "principal-investigator",
      title: "Professor",
      members: [
        {
          name: "Tianming Liu",
          role: "Distinguished Research Professor & UGA Athletic Association Professor",
          affiliation: "School of Computing · Department of Linguistics",
          bio: "Professor Liu directs the lab. His work spans computational neuroscience, biomedical image analysis, brain-inspired AI, large language models, artificial general intelligence, and quantum AI.",
          photo: "assets/images/tianming-liu.jpg",
          profilePage: "tianming-liu.html",
          links: [
            { label: "UGA profile", url: "https://computing.uga.edu/directory/people/tianming-liu" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=92RPXm0AAAAJ" },
            { label: "Email", url: "mailto:tliu@uga.edu" }
          ]
        }
      ]
    },
    {
      id: "phd-students",
      title: "Ph.D. Students",
      members: [
        {
          name: "Siyuan Li",
          role: "Ph.D. Student in Computer Science",
          bio: "Research interests include multimodal large language models, model architecture, deep reasoning, and AI for medicine.",
          photo: "assets/images/members-siyuan-li.png",
          website: "https://siyuanli.tech/",
          links: [
            { label: "Website", url: "https://siyuanli.tech/" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/siyuan-li-uga/" },
            { label: "GitHub", url: "https://github.com/liaoyanqing666" },
            { label: "Email", url: "mailto:sl64343@uga.edu" }
          ]
        },
        {
          name: "Shaochen Xu",
          role: "Ph.D. Student in Computer Science",
          bio: "Works on large language models and biomedical applications, including medical question answering and pharmacy.",
          photo: "assets/images/members-shaochen-xu.jpg",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/stevenxsc/" },
            { label: "Email", url: "mailto:sx76699@uga.edu" }
          ]
        },
        {
          name: "Huaqin Zhao",
          role: "Ph.D. Student in Computer Science",
          bio: "Studies efficient optimization and adaptation methods for large language models.",
          photo: "assets/images/members-huaqin-zhao.jpg",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/huaqin-zhao-860b19219" },
            { label: "Email", url: "mailto:hz33227@uga.edu" }
          ]
        },
        {
          name: "Yiwei Li",
          role: "Ph.D. Student in Computer Science",
          bio: "Studies multimodal learning, computational neuroscience, vision-language models, and AI for medicine and science.",
          photo: "assets/images/members-yiwei-li.jpg",
          website: "https://levyisthebest.github.io/yiweili_levi.github.io/",
          links: [
            { label: "Website", url: "https://levyisthebest.github.io/yiweili_levi.github.io/" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=sfEPWiAAAAAJ&hl=en" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/yiwei-li-84708526b/" },
            { label: "GitHub", url: "https://github.com/levyisthebest" },
            { label: "Email", url: "mailto:yl80817@uga.edu" }
          ]
        },
        {
          name: "Hanqi Jiang",
          role: "Ph.D. Student in Computer Science",
          bio: "Researches quantum AI, medical image analysis, brain-inspired intelligence, and memory for LLM agents.",
          photo: "assets/images/members-hanqi-jiang.jpg",
          website: "https://hq0709.github.io/",
          links: [
            { label: "Website", url: "https://hq0709.github.io/" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=adC1a0IAAAAJ&hl=en" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/hanqi-jiang-024b622b6" },
            { label: "GitHub", url: "https://github.com/hq0709" },
            { label: "Email", url: "mailto:hanqi.jiang@uga.edu" }
          ]
        },
        {
          name: "Peng Shu",
          role: "Ph.D. Student in Computer Science",
          bio: "Works on large language models, medical AI, agent systems, and knowledge-intensive reasoning.",
          photo: "assets/images/members-peng-shu.jpg",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/pengshu7" },
            { label: "Email", url: "mailto:ps47974@uga.edu" }
          ]
        },
        {
          name: "Weihang You",
          role: "Ph.D. Student in Computer Science",
          bio: "Studies agent memory, multimodal language models, and applications of AI in education and science.",
          links: [
            { label: "Email", url: "mailto:weihang.you@uga.edu" }
          ]
        },
        {
          name: "Yifan Zhou",
          role: "Ph.D. Student in Computer Science",
          bio: "Researches quantum machine learning and multimodal models for biomedical applications.",
          photo: "assets/images/members-yifan-zhou.jpg",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/yifan-zhou-19a677238" },
            { label: "Email", url: "mailto:yz44466@uga.edu" }
          ]
        },
        {
          name: "Yi Pan",
          role: "Ph.D. Student in Computer Science",
          bio: "Studies multi-agent systems, quantum AI, multimodal large language models, and healthcare applications.",
          photo: "assets/images/members-yi-pan.png",
          website: "https://ypanstupidog.github.io/",
          links: [
            { label: "Website", url: "https://ypanstupidog.github.io/" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=jENRqN8AAAAJ&hl=en" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/yi-pan-a6545b202" },
            { label: "GitHub", url: "https://github.com/yPanStupidog" },
            { label: "Email", url: "mailto:ypan24@uga.edu" }
          ]
        },
        {
          name: "Junhao Chen",
          role: "Ph.D. Student in Computer Science",
          bio: "Works on quantum language models, compact hybrid architectures, and medical AI.",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/junhao-chen-4770111b3" },
            { label: "Email", url: "mailto:jc43275@uga.edu" }
          ]
        },
        {
          name: "Xinliang Li",
          role: "Ph.D. Student in Computer Science",
          bio: "Works at the intersection of AI, brain biomechanics, and data-driven biomedical engineering.",
          photo: "assets/images/members-xinliang-li.png",
          website: "https://xqwang.engr.uga.edu/group/",
          links: [
            { label: "Website", url: "https://xqwang.engr.uga.edu/group/" },
            { label: "Email", url: "mailto:Xinliang.Li@uga.edu" }
          ]
        },
        {
          name: "Triparna Ganguly",
          role: "Ph.D. Student in Computer Science",
          bio: "Studies language models and multimodal systems, including models for physical interaction and embodied tasks.",
          photo: "assets/images/members-triparna-ganguly.jpg",
          links: [
            { label: "Email", url: "mailto:tg28268@uga.edu" }
          ]
        },
        {
          name: "Ruidong Zhang",
          role: "Ph.D. Student in Computer Science",
          bio: "Researches large language models, agent memory, and evaluation of advanced reasoning systems.",
          photo: "assets/images/members-ruidong-zhang.jpg",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/ruidong-zhang-855412296" },
            { label: "Email", url: "mailto:rz87209@uga.edu" }
          ]
        },
        {
          name: "Zongtan Li",
          role: "Ph.D. Student in Engineering",
          bio: "Research interests include control theory, robotics, and 3D computer vision.",
          photo: "assets/images/members-zongtan-li.jpeg",
          website: "https://yunlishao.github.io/people.html",
          links: [
            { label: "Website", url: "https://yunlishao.github.io/people.html" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/zongtan-li-92120a28a" },
            { label: "Email", url: "mailto:zongtan.li@uga.edu" }
          ]
        },
        {
          name: "Lifeng Chen",
          role: "Ph.D. Student in Linguistics",
          bio: "Studies low-resource language technologies and the adaptation of large language models, including work on Tibetan."
        },
        {
          name: "Mani Deepika Adusumilli",
          role: "Ph.D. Student in Computer Science",
          bio: "Research interests include large language models and applied artificial intelligence.",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/adusumilli-manideepika" },
            { label: "Email", url: "mailto:ma42392@uga.edu" }
          ]
        },
        {
          name: "Khoa Le",
          role: "Ph.D. Student in Computer Science",
          bio: "Works on biomedical image analysis, connections between vision and brain function, and quantum medical applications.",
          photo: "assets/images/members-khoa-le.jpeg",
          website: "https://computing.uga.edu/news/stories/2025/khoa-le-inspiring-next-generation-computer-scientists-uga",
          links: [
            { label: "UGA profile", url: "https://computing.uga.edu/news/stories/2025/khoa-le-inspiring-next-generation-computer-scientists-uga" },
            { label: "Email", url: "mailto:kl58277@uga.edu" }
          ]
        }
      ]
    },
    {
      id: "masters-students",
      title: "Master’s Students",
      members: [
        {
          name: "Xinrui Shen",
          role: "Master in Data Science at USC"
        },
      ]
    },
    // {
    //   id: "undergraduate-students",
    //   title: "Undergraduate Students",
    //   members: [
    //     {
    //       name: "Example Undergraduate Student",
    //       role: "Undergraduate Researcher",
    //       bio: "Replace this record in assets/js/data.js when a new member joins.",
    //       isPlaceholder: true
    //     }
    //   ]
    // },
    {
      id: "alumni",
      title: "Alumni",
      members: [
        {
          name: "Dajiang Zhu",
          role: "Former Ph.D. Student · 2014",
          sortYear: 2014,
          affiliation: "Current: The University of Texas at Arlington",
          bio: "Associate Professor in Computer Science and Engineering, working on brain imaging, computational neuroscience, brain-inspired AI, and medical data analysis.",
          photo: "assets/images/members-dajiang-zhu.jpg",
          website: "https://ranger.uta.edu/~zhu/index.html",
          links: [
            { label: "Website", url: "https://ranger.uta.edu/~zhu/index.html" },
            { label: "UTA profile", url: "https://mentis.uta.edu/explore/profile/dajiang-zhu" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=cFgudIYAAAAJ" },
            { label: "Email", url: "mailto:dajiang.zhu@uta.edu" }
          ]
        },
        {
          name: "Jinglei Lv",
          role: "Former Ph.D. Student · 2016",
          sortYear: 2016.03,
          affiliation: "Current: The University of Sydney",
          bio: "Senior Lecturer in Biomedical Engineering, working on neuroimaging, connectomics, and AI for brain health.",
          photo: "assets/images/members-jinglei-lv.jpg",
          website: "https://profiles.sydney.edu.au/jinglei.lv",
          links: [
            { label: "Website", url: "https://profiles.sydney.edu.au/jinglei.lv" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=jA838pcAAAAJ&hl=en" },
            { label: "LinkedIn", url: "https://au.linkedin.com/in/jinglei-lv-6428449a" },
            { label: "Email", url: "mailto:jinglei.lv@sydney.edu.au" }
          ]
        },
        {
          name: "Xiang Li",
          role: "Former Ph.D. Student · 2016",
          sortYear: 2016.05,
          affiliation: "Current: Massachusetts General Hospital · Harvard Medical School · Kempner Institute",
          bio: "Assistant Professor of Radiology developing generalized, robust, and explainable multimodal AI for healthcare.",
          photo: "assets/images/members-xiang-li.jpg",
          website: "https://xiangli-shaun.github.io/",
          links: [
            { label: "Website", url: "https://xiangli-shaun.github.io/" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=MjkwwiQAAAAJ&hl=en" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/xiang-li-11b2b99/" },
            { label: "Email", url: "mailto:xli60@mgh.harvard.edu" }
          ]
        },
        {
          name: "Wei Zhang",
          role: "Former Ph.D. Student · 2019",
          sortYear: 2019,
          affiliation: "Current: Augusta University",
          bio: "Assistant Professor whose research includes machine learning, optimization, computational neuroscience, and quantum AI.",
          photo: "assets/images/members-wei-zhang.jpg",
          website: "https://www.augusta.edu/faculty/directory/view.php?id=WZHANG2",
          links: [
            { label: "Augusta profile", url: "https://www.augusta.edu/faculty/directory/view.php?id=WZHANG2" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?hl=en&user=lQQCQSUAAAAJ" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/wei-zhang-142900b7" }
          ]
        },
        {
          name: "Haixing Dai",
          role: "Former Ph.D. Student · 2023",
          sortYear: 2023.05,
          affiliation: "Current: Meta",
          bio: "Research Scientist working on memory systems, personalization, generative models, and advanced AI systems.",
          photo: "assets/images/members-haixing-dai.jpg",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/haixing-dai-754490181" }
          ]
        },
        {
          name: "Lin Zhao",
          role: "Former Ph.D. Student · 2023",
          sortYear: 2023.06,
          affiliation: "Current: New Jersey Institute of Technology",
          bio: "Assistant Professor of Biomedical Engineering and director of the Machine Intelligence in Medicine and Imaging Lab.",
          photo: "assets/images/members-lin-zhao.jpeg",
          website: "https://lin-zhao-research.github.io/",
          links: [
            { label: "Website", url: "https://lin-zhao-research.github.io/" },
            { label: "Google Scholar", url: "https://scholar.google.com/citations?user=RxG1Wj8AAAAJ" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/lin-zhao-959491175" },
            { label: "NJIT profile", url: "https://people.njit.edu/profile/lz399" }
          ]
        },
        {
          name: "Zihao Wu",
          role: "Former Ph.D. Student · 2025",
          sortYear: 2025.12,
          affiliation: "Current: Nankai University",
          bio: "Researcher working on brain-inspired foundation models, data-efficient learning, and large language models.",
          photo: "assets/images/members-zihao-wu.png",
          links: [
            { label: "UGA dissertation", url: "https://openscholar.uga.edu/record/27708" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/zihao-wu-60203b198" }
          ]
        },
        {
          name: "Zhengliang Liu",
          role: "Former Ph.D. Student · 2026 (estimated)",
          sortYear: 2026.5,
          affiliation: "Current: GyriQAI, Inc",
          affiliationUrl: "https://ezcollegeapp.com/",
          bio: "Chief Technology Officer (CTO) at the UGA LLM Lab startup, leading the development and translation of AI systems into practical products.",
          photo: "assets/images/members-zhengliang-liu.jpeg",
          website: "https://zl-liu.github.io/",
          links: [
            { label: "Website", url: "https://zl-liu.github.io/" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/zhengliang-liu-938186136" },
            { label: "GitHub", url: "https://github.com/zl-liu" },
            { label: "Email", url: "mailto:zl18864@uga.edu" }
          ]
        }
      ]
    }
  ],

  researchAreas: [
    {
      id: "area-language-models",
      title: "Large Language Models",
      summary: "Memory, reasoning, multimodal learning, trustworthy systems, efficient adaptation, and domain-focused models for medicine, science, and education.",
      topics: ["Agent memory", "Multimodal models", "Efficient adaptation", "Trustworthy AI"]
    },
    {
      id: "area-quantum-ai",
      title: "Quantum AI",
      summary: "Quantum and hybrid quantum-classical architectures that address representation learning, language processing, and biomedical modeling under NISQ constraints.",
      topics: ["Quantum NLP", "Hybrid architectures", "Quantum representation", "NISQ-aware learning"]
    },
    {
      id: "area-brain-inspired-ai",
      title: "Brain-inspired AI",
      summary: "Computational principles from brain organization and neuroimaging as a foundation for more adaptive, generalizable, and interpretable AI systems.",
      topics: ["Foundation models for fMRI", "Brain connectivity", "Neural computation", "General intelligence"]
    }
  ],

  publications: [
    {
      id: "llms",
      label: "Large Language Models",
      items: [
        {
          year: 2026,
          month: "July",
          monthNumber: 7,
          title: "Synapse: Empowering LLM Agents with Episodic-Semantic Memory via Spreading Activation",
          authors: "Hanqi Jiang, Junhao Chen, Yi Pan, Ling Chen, Weihang You, Yifan Zhou, Ruidong Zhang, Yohannes Abate, Tianming Liu",
          venue: "Findings of the Association for Computational Linguistics: ACL 2026",
          url: "https://aclanthology.org/2026.findings-acl.1108/"
        },
        {
          year: 2026,
          month: "June",
          monthNumber: 6,
          title: "Large Language Models for Manufacturing",
          authors: "Yiwei Li, Huaqin Zhao, Hanqi Jiang, Yi Pan, Zhengliang Liu, Zihao Wu, Peng Shu, Jie Tian, Tianze Yang, Shaochen Xu, Yanjun Lyu, Parker Blenk, Jacob Pence, Jason Rupram, Eliza Banu, Kenan Song, Dajiang Zhu, Xianqiao Wang, Tianming Liu",
          venue: "Journal of Manufacturing Systems, 86, 516–545",
          url: "https://doi.org/10.1016/j.jmsy.2026.02.014"
        },
        {
          year: 2025,
          month: "November",
          monthNumber: 11,
          title: "HELENE: Hessian Layer-wise Clipping and Gradient Annealing for Accelerating Fine-tuning LLM with Zeroth-order Optimization",
          authors: "Huaqin Zhao, Jiaxi Li, Yi Pan, Shizhe Liang, Xiaofeng Yang, Fei Dou, Tianming Liu, Jin Lu",
          venue: "Proceedings of EMNLP 2025",
          url: "https://aclanthology.org/2025.emnlp-main.1323/"
        },
        {
          year: 2025,
          month: "June",
          monthNumber: 6,
          title: "AugGPT: Leveraging ChatGPT for Text Data Augmentation",
          authors: "Haixing Dai, Zhengliang Liu, Wenxiong Liao, Xiaoke Huang, Yihan Cao, Zihao Wu, Lin Zhao, Shaochen Xu, Fang Zeng, Wei Liu, Ninghao Liu, Sheng Li, Dajiang Zhu, Hongmin Cai, Lichao Sun, Quanzheng Li, Dinggang Shen, Tianming Liu, Xiang Li",
          venue: "IEEE Transactions on Big Data, 11(3), 907–918",
          url: "https://doi.org/10.1109/TBDATA.2025.3536934"
        },
        {
          year: 2025,
          month: "June",
          monthNumber: 6,
          title: "Exploring the Trade-Offs: Unified Large Language Models vs Local Fine-Tuned Models for Highly-Specific Radiology NLI Task",
          authors: "Zihao Wu, Lu Zhang, Chao Cao, Xiaowei Yu, Zhengliang Liu, Lin Zhao, Yiwei Li, Haixing Dai, Chong Ma, Gang Li, Wei Liu, Quanzheng Li, Dinggang Shen, Xiang Li, Dajiang Zhu, Tianming Liu",
          venue: "IEEE Transactions on Big Data, 11(3), 1027–1041",
          url: "https://doi.org/10.1109/TBDATA.2025.3536928"
        },
        {
          year: 2024,
          month: "August",
          monthNumber: 8,
          title: "A Generalist Vision–Language Foundation Model for Diverse Biomedical Tasks",
          authors: "Kai Zhang, Rong Zhou, Eashan Adhikarla, Zhiling Yan, Yixin Liu, Jun Yu, Zhengliang Liu, Xun Chen, Brian D. Davison, Hui Ren, Jing Huang, Chen Chen, Yuyin Zhou, Sunyang Fu, Wei Liu, Tianming Liu, Xiang Li, Yong Chen, Lifang He, James Zou, Quanzheng Li, Hongfang Liu, Lichao Sun",
          venue: "Nature Medicine, 30, 3129–3141",
          url: "https://doi.org/10.1038/s41591-024-03185-2"
        },
        {
          year: 2024,
          month: "July",
          monthNumber: 7,
          title: "TrustLLM: Trustworthiness in Large Language Models",
          authors: "Yue Huang, Lichao Sun, Haoran Wang, Siyuan Wu, Qihui Zhang, Yuan Li, Chujie Gao, Yixin Huang, Wenhan Lyu, Yixuan Zhang, Xiner Li, Hanchi Sun, Zhengliang Liu, Yixin Liu, Yijue Wang, Zhikun Zhang, Bertie Vidgen, Bhavya Kailkhura, Caiming Xiong, Chaowei Xiao, Chunyuan Li, Eric P. Xing, Furong Huang, Hao Liu, Heng Ji, Hongyi Wang, Huan Zhang, Huaxiu Yao, Manolis Kellis, Marinka Zitnik, Meng Jiang, Mohit Bansal, James Zou, Jian Pei, Jian Liu, Jianfeng Gao, Jiawei Han, Jieyu Zhao, Jiliang Tang, Jindong Wang, Joaquin Vanschoren, John Mitchell, Kai Shu, Kaidi Xu, Kai-Wei Chang, Lifang He, Lifu Huang, Michael Backes, Neil Zhenqiang Gong, Philip S. Yu, Pin-Yu Chen, Quanquan Gu, Ran Xu, Rex Ying, Shuiwang Ji, Suman Jana, Tianlong Chen, Tianming Liu, Tianyi Zhou, William Yang Wang, Xiang Li, Xiangliang Zhang, Xiao Wang, Xing Xie, Xun Chen, Xuyu Wang, Yan Liu, Yanfang Ye, Yinzhi Cao, Yong Chen, Yue Zhao",
          venue: "International Conference on Machine Learning (ICML 2024)",
          url: "https://icml.cc/virtual/2024/poster/33637"
        }
      ]
    },
    {
      id: "quantum-ai",
      label: "Quantum AI",
      items: [
        {
          year: 2026,
          month: "April",
          monthNumber: 4,
          title: "MEDQUA: A NISQ-Aware Quantum Adapter for Medical Vision-Language Models",
          authors: "Yiwei Li, Yi Pan, Junhao Chen, Yifan Zhou, Hanqi Jiang, Huaqin Zhao, Yanjun Lyu, Zhengliang Liu, Lin Zhao, Dajiang Zhu, Xiang Li, Tianming Liu",
          venue: "IEEE International Symposium on Biomedical Imaging (ISBI 2026)",
          url: "https://doi.org/10.1109/ISBI61048.2026.11515966"
        },
        {
          year: 2025,
          month: "November",
          monthNumber: 11,
          title: "Bridging Classical and Quantum Computing for Next-Generation Language Models",
          authors: "Yi Pan, Hanqi Jiang, Junhao Chen, Yiwei Li, Huaqin Zhao, Lin Zhao, Yohannes Abate, Yingfeng Wang, Tianming Liu",
          venue: "Proceedings of the 2025 AAAI Fall Symposium Series",
          url: "https://doi.org/10.1609/aaaiss.v7i1.36909"
        },
        {
          year: 2025,
          month: "November",
          monthNumber: 11,
          title: "Quantum-Classical Hybrid Molecular Autoencoder for Advancing Classical Decoding",
          authors: "Afrar Jahin, Yi Pan, Yingfeng Wang, Tianming Liu, Wei Zhang",
          venue: "Proceedings of the 2025 AAAI Fall Symposium Series",
          url: "https://doi.org/10.1609/aaaiss.v7i1.36907"
        },
        {
          year: 2025,
          month: "November",
          monthNumber: 11,
          title: "MolQAE: Quantum Autoencoder for Molecular Representation Learning",
          authors: "Yi Pan, Hanqi Jiang, Wei Ruan, Dajiang Zhu, Xiang Li, Yohannes Abate, Yingfeng Wang, Tianming Liu",
          venue: "IEEE International Conference on Quantum Artificial Intelligence (QAI 2025)",
          url: "https://doi.org/10.1109/QAI63978.2025.00023"
        },
        {
          year: 2025,
          month: "October",
          monthNumber: 10,
          title: "CLAQS: Compact Learnable All-Quantum Token Mixer with Shared-ansatz for Text Classification",
          authors: "Junhao Chen, Yifan Zhou, Hanqi Jiang, Yi Pan, Yiwei Li, Huaqin Zhao, Wei Zhang, Yingfeng Wang, Tianming Liu",
          venue: "arXiv preprint; forthcoming at Quantum AI 2026",
          url: "https://arxiv.org/abs/2510.06532"
        }
      ]
    },
    {
      id: "brain-inspired-ai",
      label: "Brain-inspired AI",
      items: [
        {
          year: 2026,
          month: "April",
          monthNumber: 4,
          title: "Towards a General-purpose Foundation Model for Functional MRI Analysis",
          authors: "Cheng Wang, Yu Jiang, Zhihao Peng, Chenxin Li, Chang-Bae Bang, Lin Zhao, Wanyi Fu, Jinglei Lv, Jorge Sepulcre, Carl Yang, Lifang He, Tianming Liu, Xue-Jun Kong, Quanzheng Li, Daniel S. Barron, Anqi Qiu, Randy Hirschtick, Byung-Hoon Kim, Hongbin Han, Xiang Li, Yixuan Yuan",
          venue: "Nature Biomedical Engineering",
          url: "https://doi.org/10.1038/s41551-026-01666-y"
        },
        {
          year: 2023,
          month: "June",
          monthNumber: 6,
          title: "When Brain-inspired AI Meets AGI",
          authors: "Lin Zhao, Lu Zhang, Zihao Wu, Yuzhong Chen, Haixing Dai, Xiaowei Yu, Zhengliang Liu, Tuo Zhang, Xintao Hu, Xi Jiang, Xiang Li, Dajiang Zhu, Dinggang Shen, Tianming Liu",
          venue: "Meta-Radiology, 1(1), 100005",
          url: "https://doi.org/10.1016/j.metrad.2023.100005"
        }
      ]
    }
  ],

  opportunities: {
    "high-school": {
      title: "High School Opportunities",
      summary: "High school students may join the EZCollegeApp Campus Ambassador Program or apply for a carefully scoped research experience when mentoring capacity is available.",
      tracks: [
        {
          title: "Campus Ambassador Program",
          description: "Represent EZCollegeApp in your school and community. Ambassadors explain the platform in their own voice, introduce it to students and families who may benefit, organize outreach, and return useful feedback to the team.",
          points: ["Invitation-based, flexible, and remote", "Product, AI, marketing, and entrepreneurship learning", "A unique referral code and tentative 10% commission on paid referrals", "Program certificate and potential pathway to future internships for strong contributors", "Rates and program terms may change; no earnings are guaranteed"],
          action: { label: "View details and apply", url: "ambassador-program-gform.html" }
        },
        {
          title: "Research Exploration",
          description: "A small number of students may join a clearly scoped reading, data, evaluation, or software task with a defined mentor and schedule.",
          points: ["Evidence of sustained technical interest", "A realistic weekly time commitment", "Parent or guardian awareness", "Attach a CV or short activity résumé", "Email subject: High school application - Current School - Name", "No guaranteed placement"],
          action: { label: "Apply by email", url: "mailto:tliu@uga.edu?subject=High%20school%20application%20-%20Current%20School%20-%20Name" }
        }
      ]
    },
    undergraduate: {
      title: "Undergraduate Opportunities",
      summary: "Undergraduates may participate as campus ambassadors, represent their university and major through the Counselor Program, or contribute to a mentored research project.",
      tracks: [
        {
          title: "Campus Ambassador Program",
          description: "Represent EZCollegeApp in your campus and community. Ambassadors explain the platform in their own voice, introduce it to students and families who may benefit, organize outreach, and return useful feedback to the team.",
          points: ["Invitation-based, flexible, and remote", "Product, AI, marketing, and entrepreneurship learning", "A unique referral code and tentative 10% commission on paid referrals", "Program certificate and potential pathway to future internships for strong contributors", "Rates and program terms may change; no earnings are guaranteed"],
          action: { label: "View details and apply", url: "ambassador-program-gform.html" }
        },
        {
          title: "Counselor Program",
          description: "Represent the university you attend and your own academic major. Counselors give prospective students a first-hand, factual view of curricula, campus resources, student life, and pathways within their discipline.",
          points: ["Represent your current university and major accurately", "Answer structured student questions", "Separate personal experience from official admissions advice", "Share recurring questions with the product team"],
          action: { label: "View details and apply", url: "ambassador-program-gform.html" }
        },
        {
          title: "Undergraduate Research",
          description: "Work with a graduate mentor on implementation, evaluation, literature review, data preparation, or reproducibility in one of the lab’s research areas.",
          points: ["Relevant coursework or project experience", "Consistent weekly availability", "Ability to document work", "Attach a CV and include your expected graduation date", "Email subject: Undergraduate application - Current School - Name", "Multi-semester participation preferred"],
          action: { label: "Apply by email", url: "mailto:tliu@uga.edu?subject=Undergraduate%20application%20-%20Current%20School%20-%20Name" }
        }
      ]
    },
    masters: {
      title: "Master’s Opportunities",
      summary: "We welcome master’s students from UGA and other universities for implementation-focused internships aligned with current lab projects and mentoring capacity.",
      tracks: [
        {
          title: "Internship",
          description: "Projects may involve model development, experimental pipelines, data curation, evaluation, literature synthesis, or reproducibility across language, quantum, and brain-inspired AI. Interns may also participate in the lab’s startup projects when the work and team needs align.",
          points: ["Open to master’s students at UGA and other universities", "Strong programming and research communication", "Relevant coursework or project portfolio", "Clear alignment with an active research area", "The lab currently does not provide financial support for master’s students"]
        },
        {
          title: "How to Contact Us",
          descriptionHtml: "Email <a href=\"mailto:tliu@uga.edu\">Tianming Liu</a> and copy <a href=\"mailto:sl64343@uga.edu\">Siyuan Li</a>. Briefly describe your background, the research area that interests you, and one paper or project you would like to build on.",
          points: ["Attach a CV", "Include a transcript if helpful", "State your expected graduation date", "Email subject: Master application - Current School - Name"],
          action: { label: "Apply by email", url: "mailto:tliu@uga.edu?cc=sl64343@uga.edu&subject=Master%20application%20-%20Current%20School%20-%20Name" }
        }
      ]
    },
    phd: {
      title: "Ph.D. Opportunities",
      summary: "Prospective Ph.D. students should apply through the University of Georgia and explain how their research goals connect with the lab’s active directions.",
      tracks: [
        {
          title: "Research Fit",
          description: "We are interested in students who want to develop foundational methods while remaining attentive to evaluation, scientific rigor, and real-world impact. Ph.D. students also participate in the lab’s startup projects as part of translating research into practice.",
          points: ["Large language models and agent systems", "Quantum and hybrid quantum-classical AI", "Brain-inspired learning and neuroimaging", "AI for medicine, science, and education"]
        },
        {
          title: "How to Contact Us",
          descriptionHtml: "In addition to the formal UGA graduate application, email <a href=\"mailto:tliu@uga.edu\">Tianming Liu</a> and copy <a href=\"mailto:sl64343@uga.edu\">Siyuan Li</a> with a concise introduction and your research interests.",
          points: ["Attach a CV and summarize your academic background", "Selected publications or technical work (optional)", "Email subject: PhD application - Current School - Name"],
          action: { label: "Apply by email", url: "mailto:tliu@uga.edu?cc=sl64343@uga.edu&subject=PhD%20application%20-%20Current%20School%20-%20Name" }
        }
      ]
    }
  }
};
