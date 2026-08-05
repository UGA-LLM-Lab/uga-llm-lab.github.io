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
    contactEmail: "tliu@uga.edu",
    address: "School of Computing · University of Georgia · Athens, GA"
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
      logo: "assets/images/ezcollegeapp-wordmark-transparent.png"
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
      image: "assets/images/news-synapse.svg",
      imageAlt: "Connected memory nodes"
    },
    {
      date: "June 2026",
      sortDate: "2026-06",
      category: "Publication",
      title: "Review of large language models for manufacturing published",
      excerpt: "The review surveys LLM applications across design, quality control, robotics, supply chains, education, and knowledge systems.",
      url: "https://www.sciencedirect.com/science/article/pii/S0278612526000439"
    },
    {
      date: "August 2024",
      sortDate: "2024-08",
      category: "Publication",
      title: "BiomedGPT published in Nature Medicine",
      excerpt: "The generalist vision-language foundation model supports diverse biomedical tasks across modalities and data scales.",
      url: "https://www.nature.com/articles/s41591-024-03185-2"
    }
  ],

  memberGroups: [
    {
      id: "principal-investigator",
      title: "Principal Investigator",
      members: [
        {
          name: "Tianming Liu",
          role: "Distinguished Research Professor & UGA Athletic Association Professor",
          affiliation: "School of Computing · Department of Linguistics",
          bio: "Professor Liu directs the lab. His work spans computational neuroscience, biomedical image analysis, brain-inspired AI, large language models, artificial general intelligence, and quantum AI.",
          photo: "assets/images/tianming-liu.jpg",
          profilePage: "tianming-liu.html",
          links: [
            { label: "Lab profile", url: "tianming-liu.html" },
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
          photo: "assets/images/siyuan-li.jpg",
          website: "https://siyuanli.tech/",
          links: [
            { label: "Website", url: "https://siyuanli.tech/" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/siyuan-li-uga/" },
            { label: "GitHub", url: "https://github.com/liaoyanqing666" }
          ]
        }
      ]
    },
    {
      id: "masters-students",
      title: "Master’s Students",
      members: [
        {
          name: "Example Master’s Student",
          role: "Master’s Student",
          bio: "Replace this record in assets/js/data.js when a new member joins.",
          isPlaceholder: true
        }
      ]
    },
    {
      id: "undergraduate-students",
      title: "Undergraduate Students",
      members: [
        {
          name: "Example Undergraduate Student",
          role: "Undergraduate Researcher",
          bio: "Replace this record in assets/js/data.js when a new member joins.",
          isPlaceholder: true
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
      summary: "High school students can engage through the EZCollegeApp Campus Ambassador Program or a scoped research experience when mentorship capacity is available.",
      tracks: [
        {
          title: "Campus Ambassador Program",
          type: "EZCollegeApp",
          description: "Represent EZCollegeApp at your high school. Ambassadors introduce the platform to classmates, share product updates, organize small school-based outreach activities, and bring structured student feedback to the team.",
          points: ["Invitation-based and remote", "Product and outreach training", "School-level advocacy and referrals", "Certificate and experience subject to participation"]
        },
        {
          title: "Research Exploration",
          type: "UGA LLM Lab",
          description: "A small number of students may join a clearly scoped reading, data, evaluation, or software task with a defined mentor and schedule.",
          points: ["Evidence of sustained technical interest", "A realistic weekly time commitment", "Parent or guardian awareness", "No guaranteed placement"]
        }
      ],
      subject: "High School Opportunity Interest"
    },
    undergraduate: {
      title: "Undergraduate Opportunities",
      summary: "Undergraduates may contribute to research or serve as a college-and-major counselor for EZCollegeApp, representing the academic experience of their own university and field of study.",
      tracks: [
        {
          title: "College & Major Counselor",
          type: "EZCollegeApp",
          description: "Represent your university and academic major as a peer counselor. Counselors share first-hand, factual perspectives on curricula, campus resources, student life, and pathways within their discipline for prospective applicants.",
          points: ["Represent your enrolled university and major accurately", "Answer structured student questions", "Separate personal experience from official admissions advice", "Share recurring questions with the product team"]
        },
        {
          title: "Undergraduate Research",
          type: "UGA LLM Lab",
          description: "Work with a graduate mentor on implementation, evaluation, literature review, data preparation, or reproducibility in one of the lab’s research areas.",
          points: ["Relevant coursework or project experience", "Consistent weekly availability", "Ability to document work", "Multi-semester participation preferred"]
        }
      ],
      subject: "Undergraduate Opportunity Interest"
    },
    masters: {
      title: "Master’s Opportunities",
      summary: "Master’s students can join implementation-heavy research projects that align with the lab’s current work and available mentorship.",
      tracks: [
        {
          title: "Research Assistantship & Independent Study",
          type: "UGA LLM Lab",
          description: "Projects may involve model development, experimental pipelines, data curation, evaluation, literature synthesis, or reproducibility across language, quantum, and brain-inspired AI.",
          points: ["Strong programming and research communication", "Relevant coursework or project portfolio", "Clear alignment with an active research area", "Funding is project-dependent and not guaranteed"]
        },
        {
          title: "How to Contact Us",
          type: "Before emailing",
          description: "Send a concise message describing your background, the research area that interests you, and one specific paper or project you would like to build on.",
          points: ["Attach a CV", "Include a transcript if helpful", "Link code or prior work", "State your expected graduation date"]
        }
      ],
      subject: "Master’s Research Interest"
    },
    phd: {
      title: "Ph.D. Opportunities",
      summary: "Prospective Ph.D. students should apply through the University of Georgia and explain how their research goals connect with the lab’s active directions.",
      tracks: [
        {
          title: "Research Fit",
          type: "UGA LLM Lab",
          description: "We are interested in students who want to develop foundational methods while remaining attentive to evaluation, scientific rigor, and real-world impact.",
          points: ["Large language models and agent systems", "Quantum and hybrid quantum-classical AI", "Brain-inspired learning and neuroimaging", "AI for medicine, science, and education"]
        },
        {
          title: "Application Preparation",
          type: "Prospective students",
          description: "In addition to the formal graduate application, a concise introductory email can help establish research alignment.",
          points: ["CV and academic background", "Selected publications or technical work", "A specific research question", "Why UGA and this lab are a good fit"]
        }
      ],
      subject: "Prospective Ph.D. Student"
    }
  }
};
