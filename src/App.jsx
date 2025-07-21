import { useState, useEffect, useCallback } from 'react';
import { 
    Crown, RotateCcw, Handshake, Puzzle, Palette, Heart, MessageCircle, 
    Search, Target, Zap, Star, Rocket, Scale, Sparkles, 
    ClipboardList, BookOpen, Wrench, Users, ArrowRight, Play, 
    RotateCw, TrendingUp, Brain, BarChart3, Info, 
    Award, Clock, Trophy, CheckCircle, Lightbulb, Eye,
    User, Briefcase, Keyboard, Shield, Compass, 
    Calendar, Focus, Settings, Binoculars,
    FileText, DollarSign, Layers, RefreshCw, Sun, Globe,
    GraduationCap, Activity, Coffee, Share2, Headphones,
    Microscope, FileCheck,
    AlertTriangle, Mic, Flag, Mountain,
    Smile, UserCheck, TreePine
} from 'lucide-react';

// Define detailed descriptions for each strength outside the component
// to avoid re-creation on every render.
const strengthDefinitions = {
    "Leadership": {
        description: "The ability to guide, motivate, and inspire individuals or teams towards a common goal.",
        personal: "You often take charge in group activities, organize family events, or guide friends through challenges.",
        career: "You excel in roles requiring team management, project leadership, or strategic direction."
    },
    "Adaptability": {
        description: "The capacity to adjust quickly and effectively to new conditions, situations, or environments.",
        personal: "You handle unexpected changes with ease, quickly finding new solutions when plans shift.",
        career: "You thrive in dynamic environments, embrace new technologies, and navigate organizational changes smoothly."
    },
    "Collaboration": {
        description: "Working effectively with others to achieve shared objectives, valuing diverse perspectives.",
        personal: "You enjoy group projects, contribute positively to team sports, or coordinate well with family members.",
        career: "You are a strong team player, facilitate cross-functional initiatives, and build strong working relationships."
    },
    "Problem-Solving": {
        description: "The skill to identify problems, analyze information, and devise effective solutions.",
        personal: "You're often the go-to person for fixing issues around the house or helping friends overcome obstacles.",
        career: "You excel at troubleshooting, developing innovative solutions, and overcoming complex challenges."
    },
    "Creativity": {
        description: "The ability to generate new ideas, concepts, or solutions, often thinking outside the box.",
        personal: "You enjoy artistic pursuits, come up with original ideas for gifts or events, or find unique ways to solve daily issues.",
        career: "You contribute to innovation, design new products/services, or approach tasks with original methods."
    },
    "Empathy": {
        description: "The capacity to understand and share the feelings of another.",
        personal: "You are a good listener, offer comfort to friends in need, and easily connect with others' emotions.",
        career: "You excel in client-facing roles, HR, counseling, or any position requiring strong interpersonal understanding."
    },
    "Communication": {
        description: "The effective transmission of information, ideas, and feelings, both verbally and non-verbally.",
        personal: "You articulate your thoughts clearly, are good at explaining things, and connect well with diverse people.",
        career: "You are effective in presentations, negotiations, client interactions, and team discussions."
    },
    "Analytical Thinking": {
        description: "The ability to break down complex information into smaller parts to understand relationships and draw conclusions.",
        personal: "You enjoy puzzles, research topics thoroughly, and make decisions based on careful consideration.",
        career: "You are strong in data analysis, research, strategic planning, and problem diagnosis."
    },
    "Detail-Oriented": {
        description: "The ability to pay close attention to all aspects of a task or situation, ensuring accuracy and completeness.",
        personal: "You notice small things others miss, are meticulous in your hobbies, or organize things precisely.",
        career: "You excel in roles requiring precision, quality control, auditing, or meticulous record-keeping."
    },
    "Resilience": {
        description: "The capacity to recover quickly from difficulties; toughness.",
        personal: "You bounce back from setbacks, learn from mistakes, and stay positive despite challenges.",
        career: "You handle pressure well, adapt to changing project requirements, and persevere through difficult periods."
    },
    "Social Intelligence": {
        description: "The ability to navigate and negotiate complex social relationships and environments effectively.",
        personal: "You read social cues well, build rapport easily, and know how to behave appropriately in different social settings.",
        career: "You thrive in networking, sales, diplomacy, and roles requiring strong interpersonal influence."
    },
    "Proactiveness": {
        description: "Taking initiative and acting in anticipation of future problems, needs, or changes.",
        personal: "You anticipate needs, plan ahead, and don't wait to be told what to do.",
        career: "You identify opportunities, solve issues before they escalate, and drive new initiatives."
    },
    "Persuasion": {
        description: "The ability to influence others to adopt a particular belief, attitude, or course of action.",
        personal: "You can effectively convince friends or family to try new things or see your point of view.",
        career: "You are effective in sales, marketing, negotiation, and advocating for ideas or projects."
    },
    "Conflict Resolution": {
        description: "The process of resolving disputes or disagreements in a constructive and peaceful manner.",
        personal: "You help mediate arguments between friends or family, finding common ground.",
        career: "You can de-escalate tensions, facilitate compromises, and build consensus within teams."
    },
    "Initiative": {
        description: "The power or opportunity to act or take charge before others do.",
        personal: "You often start new projects, volunteer for tasks, or take the lead in group activities.",
        career: "You are a self-starter, propose new ideas, and drive projects forward without constant supervision."
    },
    "Planning": {
        description: "The ability to organize activities and resources to achieve a goal.",
        personal: "You meticulously plan trips, events, or personal goals, ensuring everything is covered.",
        career: "You excel in project management, strategic development, and operational organization."
    },
    "Learning Agility": {
        description: "The willingness and ability to learn from experience, and then apply that learning to perform in new or changing conditions.",
        personal: "You quickly pick up new hobbies, adapt to new software, or understand complex topics rapidly.",
        career: "You are quick to master new technologies, adapt to evolving job requirements, and learn from feedback."
    },
    "Resourcefulness": {
        description: "The ability to find quick and clever ways to overcome difficulties.",
        personal: "You can make do with what you have, find creative solutions to problems, or fix things with limited tools.",
        career: "You excel at finding solutions with limited resources, optimizing processes, and improvising effectively."
    },
    "Frugality": {
        description: "The quality of being economical with money or food; thriftiness.",
        personal: "You are good at managing your budget, finding deals, and making wise financial decisions.",
        career: "You excel in roles requiring cost management, financial planning, or efficient resource allocation."
    },
    "Prioritization": {
        description: "The ability to determine the relative importance of tasks or goals and order them accordingly.",
        personal: "You effectively manage your time and tasks, focusing on what truly matters first.",
        career: "You can manage multiple projects, meet deadlines, and allocate resources to high-impact activities."
    },
    "Decision-Making": {
        description: "The process of making choices by identifying a decision, gathering information, and assessing alternative resolutions.",
        personal: "You make well-thought-out choices, even under pressure, considering all angles.",
        career: "You are adept at making informed choices, evaluating risks, and leading others through decision processes."
    },
    "Efficiency": {
        description: "Achieving maximum productivity with minimum wasted effort or expense.",
        personal: "You find the quickest and best ways to get things done, optimizing your daily routines.",
        career: "You streamline processes, reduce waste, and improve productivity in your work."
    },
    "Flexibility": {
        description: "The willingness to change or compromise.",
        personal: "You are open to new ideas, can easily adjust plans, and are comfortable with ambiguity.",
        career: "You adapt well to changing project scopes, team structures, and organizational priorities."
    },
    "Optimism": {
        description: "Hopefulness and confidence about the future or the success of something.",
        personal: "You maintain a positive outlook, even in challenging situations, and inspire others.",
        career: "You motivate teams, maintain morale during difficult times, and approach challenges with a can-do attitude."
    },
    "Strategic Thinking": {
        description: "The ability to see the big picture, anticipate future trends, and plan for long-term success.",
        personal: "You think several steps ahead, consider long-term consequences, and plan your life goals carefully.",
        career: "You contribute to long-term vision, develop effective business strategies, and identify market opportunities."
    },
    "Networking": {
        description: "The ability to build and maintain a network of contacts for professional or personal support and opportunities.",
        personal: "You enjoy meeting new people, maintain strong relationships, and connect people who can help each other.",
        career: "You build valuable professional relationships, find mentors, and create opportunities through connections."
    },
    "Open-mindedness": {
        description: "Willingness to consider new ideas or opinions, even if they differ from your own.",
        personal: "You are receptive to different viewpoints, enjoy learning about new cultures, and are not quick to judge.",
        career: "You embrace diverse perspectives, are open to feedback, and encourage innovative thinking."
    },
    "Humility": {
        description: "A modest or low view of one's own importance; humbleness.",
        personal: "You acknowledge your mistakes, are eager to learn from others, and don't boast about your achievements.",
        career: "You are coachable, value team contributions over individual glory, and foster a collaborative environment."
    },
    "Perseverance": {
        description: "Persistence in doing something despite difficulty or delay in achieving success.",
        personal: "You stick with challenging tasks, don't give up easily, and keep trying until you succeed.",
        career: "You push through obstacles, remain committed to long-term goals, and overcome project setbacks."
    },
    "Dedication": {
        description: "The quality of being committed to a task or purpose.",
        personal: "You are committed to your passions, follow through on promises, and invest fully in what you care about.",
        career: "You show strong commitment to your work, consistently deliver high-quality results, and are reliable."
    },
    "Discipline": {
        description: "The practice of training people to obey rules or a code of behavior, using punishment to correct disobedience.",
        personal: "You maintain good habits, stick to routines, and exercise self-control to achieve your goals.",
        career: "You consistently meet deadlines, adhere to standards, and maintain focus on critical tasks."
    },
    "Self-Discipline": {
        description: "The ability to control one's feelings and overcome one's weaknesses; the ability to pursue what one thinks is right despite temptations to abandon it.",
        personal: "You resist impulses, stick to your study or exercise plans, and manage your time effectively.",
        career: "You manage your workload independently, stay focused on priorities, and maintain productivity without constant oversight."
    },
    "Action-Oriented": {
        description: "Inclined to take action rather than to think or speculate.",
        personal: "You prefer to start doing things rather than just talking about them, and you get things done.",
        career: "You are a doer, quickly move from planning to execution, and drive results."
    },
    "Responsibility": {
        description: "The state or fact of having a duty to deal with something or of having control over someone.",
        personal: "You take ownership of your tasks, follow through on commitments, and are reliable.",
        career: "You are accountable for your work, take initiative to solve problems, and reliably meet expectations."
    },
    "Improvement-Oriented": {
        description: "A focus on continuously seeking ways to enhance processes, skills, or outcomes.",
        personal: "You constantly look for ways to do things better, whether it's a hobby or a daily chore.",
        career: "You seek feedback, implement best practices, and drive continuous improvement initiatives."
    },
    "Goal-Oriented": {
        description: "Focused on achieving a specific objective or result.",
        personal: "You set clear goals for yourself and work diligently to achieve them, whether personal or academic.",
        career: "You define clear objectives, align your efforts with strategic goals, and deliver measurable results."
    },
    "Motivation": {
        description: "The reason or reasons one has for acting or behaving in a particular way.",
        personal: "You are driven by your passions, inspire others to achieve, and maintain enthusiasm for tasks.",
        career: "You inspire teams, drive performance, and maintain a high level of engagement in your work."
    },
    "Curiosity": {
        description: "A strong desire to know or learn something.",
        personal: "You love exploring new topics, asking questions, and seeking out new experiences.",
        career: "You are a natural investigator, constantly learning new skills, and exploring innovative ideas."
    },
    "Innovation": {
        description: "The action or process of innovating, introducing new ideas, methods, or products.",
        personal: "You enjoy experimenting with new ways of doing things, creating original solutions, or inventing.",
        career: "You drive creative problem-solving, develop groundbreaking products, and foster a culture of new ideas."
    },
    "Teaching": {
        description: "The ability to impart knowledge or instruct someone on how to do something.",
        personal: "You enjoy explaining complex topics to others, patiently guiding them through learning processes.",
        career: "You are effective in training, mentoring, and clearly communicating instructions or concepts."
    },
    "Knowledge Sharing": {
        description: "The exchange of knowledge, expertise, and information among individuals or groups.",
        personal: "You enjoy sharing what you've learned with others, helping them grow and succeed.",
        career: "You contribute to team learning, document best practices, and facilitate knowledge transfer within the organization."
    },
    "Research": {
        description: "The systematic investigation into and study of materials and sources in order to establish facts and reach new conclusions.",
        personal: "You thoroughly investigate topics of interest, verify information, and seek out reliable sources.",
        career: "You excel at gathering information, analyzing data, and providing well-researched insights."
    },
    "Due Diligence": {
        description: "Reasonable steps taken by a person in order to satisfy a legal or contractual requirement, especially in buying or selling something.",
        personal: "You are thorough in your preparations, carefully checking details before making important decisions.",
        career: "You ensure all necessary checks are performed, mitigate risks, and ensure compliance in projects."
    },
    "Risk Assessment": {
        description: "The identification and evaluation of risks, and the development of strategies to mitigate them.",
        personal: "You are good at identifying potential problems before they arise and planning for them.",
        career: "You can foresee potential issues, evaluate their impact, and develop effective mitigation strategies."
    },
    "Intuition": {
        description: "The ability to understand something immediately, without the need for conscious reasoning.",
        personal: "You often have a 'gut feeling' that turns out to be right, guiding your decisions naturally.",
        career: "You can make quick, effective decisions in ambiguous situations, often seeing patterns others miss."
    },
    "Experience": {
        description: "Practical contact with and observation of facts or events.",
        personal: "You draw upon your past learnings to navigate new situations and offer valuable advice.",
        career: "You leverage your accumulated knowledge to solve problems, mentor others, and make informed decisions."
    },
    "Confidence": {
        description: "The feeling or belief that one can rely on someone or something; firm trust.",
        personal: "You believe in your abilities, speak your mind respectfully, and approach challenges with assurance.",
        career: "You present ideas convincingly, lead with conviction, and inspire trust in your team and clients."
    },
    "Clarity": {
        description: "The quality of being coherent and intelligible.",
        personal: "You express yourself in a way that is easy to understand, avoiding jargon or ambiguity.",
        career: "You write clear reports, give precise instructions, and ensure messages are easily interpreted."
    },
    "Audience Awareness": {
        description: "The ability to tailor communication and actions to suit the needs, interests, and understanding of a specific audience.",
        personal: "You adjust your communication style depending on who you're talking to, making sure your message lands.",
        career: "You customize presentations, marketing messages, and client interactions for maximum impact."
    },
    "Conciseness": {
        description: "The quality of giving a lot of information clearly and in a few words; brevity.",
        personal: "You get straight to the point, communicate effectively without unnecessary details, and value efficiency.",
        career: "You write succinct reports, deliver impactful summaries, and communicate efficiently in meetings."
    },
    "Preparation": {
        description: "The action or process of making something ready for use or for a future event.",
        personal: "You thoroughly prepare for important events, exams, or presentations, leaving nothing to chance.",
        career: "You meticulously plan projects, gather all necessary resources, and anticipate potential issues."
    },
    "Public Speaking": {
        description: "The act or skill of delivering speeches to a live audience.",
        personal: "You are comfortable speaking in front of groups, whether it's a family gathering or a community event.",
        career: "You deliver engaging presentations, lead successful meetings, and represent your organization effectively."
    },
    "Time Management": {
        description: "The ability to use one's time effectively or productively, especially at work.",
        personal: "You organize your schedule well, meet deadlines, and balance multiple commitments efficiently.",
        career: "You prioritize tasks, manage project timelines, and ensure timely delivery of work."
    },
    "Organization": {
        description: "The action of organizing something.",
        personal: "You keep your belongings, tasks, and thoughts in order, making things easy to find and manage.",
        career: "You maintain structured workflows, organize files and data, and ensure efficient operations."
    },
    "Self-Care": {
        description: "The practice of taking action to preserve or improve one's own health.",
        personal: "You prioritize your well-being, take breaks when needed, and engage in activities that recharge you.",
        career: "You manage stress effectively, prevent burnout, and advocate for healthy work-life balance."
    },
    "Mindfulness": {
        description: "The quality or state of being conscious or aware of something.",
        personal: "You are present in the moment, observe your thoughts and feelings without judgment, and appreciate small details.",
        career: "You make thoughtful decisions, manage emotional responses, and maintain focus in demanding situations."
    },
    "Supportiveness": {
        description: "Providing encouragement or emotional help.",
        personal: "You are a good friend, offer encouragement to loved ones, and are there for people in tough times.",
        career: "You foster a positive team environment, mentor junior colleagues, and provide constructive feedback."
    },
    "Encouragement": {
        description: "The action of giving someone support, confidence, or hope.",
        personal: "You inspire others to pursue their goals, celebrate their successes, and help them believe in themselves.",
        career: "You motivate team members, boost morale, and help colleagues overcome challenges."
    },
    "Positive Reinforcement": {
        description: "The addition of a reinforcing stimulus following a behavior that makes it more likely that the behavior will occur again in the future.",
        personal: "You acknowledge and praise good behavior or effort in others, making them feel valued.",
        career: "You recognize achievements, provide constructive feedback, and motivate through positive recognition."
    },
    "Recognition": {
        description: "Acknowledgement of something's existence, validity, or legality.",
        personal: "You are quick to notice and appreciate the efforts and achievements of others.",
        career: "You celebrate team successes, acknowledge individual contributions, and foster a culture of appreciation."
    },
    "Coaching": {
        description: "Training or instructing a person or team.",
        personal: "You enjoy guiding others to improve their skills, offering advice and practical steps.",
        career: "You develop team members, provide guidance for performance improvement, and foster growth."
    },
    "Practicality": {
        description: "The quality or state of being practical.",
        personal: "You focus on realistic solutions, prefer hands-on approaches, and value common sense.",
        career: "You implement workable solutions, optimize processes for real-world application, and avoid theoretical complexities."
    },
    "Growth Mindset": {
        description: "The belief that one's abilities and intelligence can be developed through dedication and hard work.",
        personal: "You see challenges as opportunities to learn, believe in continuous self-improvement, and embrace new skills.",
        career: "You seek out new learning opportunities, are open to feedback, and view failures as stepping stones to success."
    },
    "Courage": {
        description: "The ability to do something that frightens one; bravery.",
        personal: "You stand up for what you believe in, face your fears, and take risks for personal growth.",
        career: "You take calculated risks, speak truth to power, and champion unpopular but necessary ideas."
    },
    "Data-Driven": {
        description: "Making decisions based on evidence and analysis of facts, rather than on intuition or anecdote.",
        personal: "You prefer to look at facts and figures before making important decisions, whether it's a purchase or a plan.",
        career: "You base strategies on analytics, use metrics to track progress, and make informed business decisions."
    },
    "Accuracy": {
        description: "The quality or state of being correct or precise.",
        personal: "You strive for correctness in everything you do, paying close attention to details.",
        career: "You ensure data integrity, produce error-free reports, and maintain high standards of quality."
    },
    "Thoroughness": {
        description: "The quality of being careful and complete.",
        personal: "You complete tasks meticulously, leaving no stone unturned, and ensure all aspects are covered.",
        career: "You conduct comprehensive analyses, leave no details unchecked, and deliver fully vetted solutions."
    },
    "Focus": {
        description: "The center of interest or activity.",
        personal: "You can concentrate deeply on tasks, minimize distractions, and complete work efficiently.",
        career: "You maintain concentration on critical tasks, avoid multitasking, and drive projects to completion."
    },
    "Transparency": {
        description: "The condition of being transparent.",
        personal: "You are open and honest in your dealings, sharing information clearly and directly.",
        career: "You communicate openly with stakeholders, foster trust, and ensure clarity in processes and decisions."
    },
    "Boundary Setting": {
        description: "The practice of establishing limits or rules to protect one's time, energy, or well-being.",
        personal: "You know when to say no, protect your personal time, and maintain a healthy work-life balance.",
        career: "You manage expectations effectively, protect team capacity, and ensure sustainable workloads."
    },
    "Self-reflection": {
        description: "Serious thought about one's character, actions, and motives.",
        personal: "You regularly think about your experiences, learn from them, and understand your own feelings and motivations.",
        career: "You analyze your performance, seek self-improvement, and learn from both successes and failures."
    },
    "Vulnerability": {
        description: "The quality or state of being exposed to the possibility of being attacked or harmed, either physically or emotionally.",
        personal: "You are comfortable showing your true self, asking for help, and admitting when you don't know something.",
        career: "You build trust by being authentic, foster open communication, and encourage psychological safety in teams."
    },
    "Seeking Help": {
        description: "The ability to recognize when assistance is needed and to actively ask for it.",
        personal: "You are not afraid to ask for advice or support when facing challenges.",
        career: "You leverage expertise from colleagues, seek mentorship, and utilize available resources effectively."
    },
    "Visionary": {
        description: "Thinking about or planning the future with imagination or wisdom.",
        personal: "You have a clear idea of what you want to achieve in the long term and inspire others with your dreams.",
        career: "You articulate inspiring future states, develop innovative strategies, and lead organizational change."
    },
    "Inspiration": {
        description: "The process of being mentally stimulated to do or feel something, especially to do something creative.",
        personal: "You motivate yourself and others, fostering enthusiasm and a positive outlook.",
        career: "You encourage creativity, foster a positive work environment, and inspire teams to reach their full potential."
    },
    "Empowerment": {
        description: "The process of becoming stronger and more confident, especially in controlling one's life and claiming one's rights.",
        personal: "You encourage others to take initiative, trust their abilities, and support their independence.",
        career: "You delegate effectively, provide autonomy to team members, and foster a sense of ownership."
    },
    "Trust": {
        description: "Firm belief in the reliability, truth, ability, or strength of someone or something.",
        personal: "You are reliable and trustworthy, and you build strong relationships based on mutual respect.",
        career: "You build strong relationships with colleagues and clients, fostering a reliable and collaborative work environment."
    },
    "Integrity": {
        description: "The quality of being honest and having strong moral principles; moral uprightness.",
        personal: "You consistently act in accordance with your values, even when it's difficult, and are honest.",
        career: "You uphold ethical standards, build trust with stakeholders, and act with honesty and transparency."
    },
    "Ethics": {
        description: "Moral principles that govern a person's behavior or the conducting of an activity.",
        personal: "You consider the moral implications of your actions and strive to do what is right.",
        career: "You make decisions that align with ethical guidelines and promote a responsible organizational culture."
    },
    "Wisdom": {
        description: "The quality of having experience, knowledge, and good judgment; the quality of being wise.",
        personal: "You learn from your experiences, offer thoughtful advice, and make sound judgments.",
        career: "You provide valuable insights, mentor others, and make well-reasoned decisions based on broad understanding."
    },
    "Seeking Counsel": {
        description: "The act of asking for advice or guidance from others.",
        personal: "You are open to receiving advice and actively seek out knowledgeable people when facing decisions.",
        career: "You consult with experts, gather diverse opinions, and make informed decisions based on collective wisdom."
    },
    "Foresight": {
        description: "The ability to predict what will happen or be needed in the future.",
        personal: "You anticipate future needs or problems and plan accordingly, often avoiding issues before they arise.",
        career: "You identify future trends, anticipate market shifts, and develop proactive strategies."
    },
    "Cultural Awareness": {
        description: "Understanding and appreciating the customs, beliefs, and values of different cultures.",
        personal: "You are respectful of diverse backgrounds, enjoy learning about other cultures, and adapt well in new cultural settings.",
        career: "You navigate diverse work environments, build strong international relationships, and understand global markets."
    },
    "Experimentation": {
        description: "The process of trying out new ideas or methods.",
        personal: "You are willing to try new things, learn from trial and error, and are not afraid to fail.",
        career: "You test new approaches, iterate on solutions, and foster a culture of continuous learning and innovation."
    },
    "Active Listening": {
        description: "The practice of fully concentrating on, understanding, and responding thoughtfully to a speaker.",
        personal: "You pay careful attention when others speak, ask clarifying questions, and remember important details.",
        career: "You facilitate effective meetings, understand client needs thoroughly, and build strong team relationships."
    },
    "Fairness": {
        description: "The quality of treating people equally and justly, without favoritism or discrimination.",
        personal: "You ensure everyone gets equal treatment, consider all perspectives, and make impartial decisions.",
        career: "You handle conflicts objectively, distribute opportunities equitably, and promote inclusive practices."
    },
    "Facilitation": {
        description: "The ability to help groups work together more effectively, encouraging participation and guiding discussions.",
        personal: "You help family discussions run smoothly, ensure everyone's voice is heard, and guide group decisions.",
        career: "You lead productive meetings, moderate discussions, and help teams reach consensus."
    },
    "Diplomacy": {
        description: "The skill of dealing with people in a sensitive and tactful way to maintain good relationships.",
        personal: "You handle sensitive situations delicately, avoid conflicts, and maintain harmony in relationships.",
        career: "You navigate office politics skillfully, manage stakeholder relationships, and resolve disputes tactfully."
    },
    "Influence": {
        description: "The ability to affect the opinions or behavior of others in a positive way.",
        personal: "You naturally inspire others to make positive changes and help guide decisions in your social circle.",
        career: "You drive organizational change, motivate team performance, and shape strategic decisions."
    },
    "Delegation": {
        description: "The ability to assign responsibility and authority to others effectively.",
        personal: "You trust others with important tasks, provide clear guidance, and allow people to take ownership.",
        career: "You distribute work effectively, develop team members through stretch assignments, and scale your impact."
    },
    "Risk Management": {
        description: "The identification, assessment, and prioritization of risks followed by coordinated efforts to minimize their impact.",
        personal: "You anticipate potential problems, take preventive measures, and have backup plans ready.",
        career: "You identify project risks early, develop mitigation strategies, and ensure business continuity."
    },
    "Self-awareness": {
        description: "The conscious knowledge of one's own character, feelings, motives, and desires.",
        personal: "You understand your emotions, recognize your strengths and weaknesses, and know what motivates you.",
        career: "You seek feedback actively, adapt your communication style, and make decisions aligned with your values."
    }
};

// Original scenarios array (kept separate for shuffling logic)
const originalScenarios = [
    {
        text: "You're leading a team project, and a critical deadline is approaching, but a key team member suddenly falls ill.",
        choices: [
            { text: "Reassign tasks and rally the team to cover the missing member's work.", strengths: ["Leadership", "Adaptability", "Collaboration"] },
            { text: "Brainstorm alternative solutions with the team to simplify the remaining work.", strengths: ["Problem-Solving", "Creativity", "Collaboration"] },
            { text: "Reach out to the sick team member to offer support and understand their situation.", strengths: ["Empathy", "Communication"] }
        ]
    },
    {
        text: "You discover a complex bug in a crucial software system just before launch. Time is running out.",
        choices: [
            { text: "Systematically trace the code, breaking down the problem into smaller, manageable parts.", strengths: ["Analytical Thinking", "Detail-Oriented", "Problem-Solving"] },
            { text: "Collaborate with other developers, sharing your findings and asking for fresh perspectives.", strengths: ["Collaboration", "Communication", "Problem-Solving"] },
            { text: "Develop a quick workaround to mitigate the immediate impact, then plan for a permanent fix post-launch.", strengths: ["Adaptability", "Creativity", "Resilience"] }
        ]
    },
    {
        text: "You're at a social gathering where you don't know many people. How do you approach the situation?",
        choices: [
            { text: "Introduce yourself to a small group and ask open-ended questions to get to know them.", strengths: ["Communication", "Social Intelligence"] },
            { text: "Observe the room, identify common interests, and then join a conversation naturally.", strengths: ["Observation", "Adaptability", "Social Intelligence"] },
            { text: "Offer to help the host with something, using it as an opportunity to meet people.", strengths: ["Proactiveness", "Collaboration", "Communication"] }
        ]
    },
    {
        text: "Your team's new idea is met with skepticism by stakeholders. How do you respond?",
        choices: [
            { text: "Prepare a detailed presentation with data and logical arguments to support your idea.", strengths: ["Analytical Thinking", "Communication", "Persuasion"] },
            { text: "Listen carefully to their concerns, acknowledge their points, and then address them constructively.", strengths: ["Empathy", "Communication", "Conflict Resolution"] },
            { text: "Iterate on the idea based on feedback, presenting a revised version that incorporates their input.", strengths: ["Adaptability", "Creativity", "Resilience"] }
        ]
    },
    {
        text: "You're given a task with no clear instructions. What's your first step?",
        choices: [
            { text: "Break the task down into smaller components and define your own steps to achieve the goal.", strengths: ["Problem-Solving", "Initiative", "Planning"] },
            { text: "Seek clarification from the person who assigned the task, asking specific questions.", strengths: ["Communication", "Detail-Oriented"] },
            { text: "Research similar tasks or projects to gather information and best practices.", strengths: ["Learning Agility", "Resourcefulness", "Analytical Thinking"] }
        ]
    },
    {
        text: "You have a tight budget for a personal project, but you want to achieve a high-quality outcome.",
        choices: [
            { text: "Research cost-effective alternatives and DIY solutions to save money.", strengths: ["Resourcefulness", "Frugality", "Problem-Solving"] },
            { text: "Prioritize essential features and cut back on non-critical elements to stay within budget.", strengths: ["Prioritization", "Decision-Making", "Efficiency"] },
            { text: "Seek advice from experienced individuals on how to maximize impact with limited resources.", strengths: ["Learning Agility", "Networking", "Open-mindedness"] }
        ]
    },
    {
        text: "You're faced with a sudden, unexpected change in your daily routine that disrupts your plans.",
        choices: [
            { text: "Quickly adjust your schedule and find new ways to accomplish your goals.", strengths: ["Adaptability", "Flexibility", "Resilience"] },
            { text: "Take a moment to assess the situation and identify potential opportunities within the change.", strengths: ["Optimism", "Strategic Thinking", "Problem-Solving"] },
            { text: "Communicate with others affected by the change to coordinate new plans.", strengths: ["Communication", "Collaboration", "Empathy"] }
        ]
    },
    {
        text: "You need to learn a completely new skill for a hobby or job requirement.",
        choices: [
            { text: "Find online courses, tutorials, and books to self-study intensely.", strengths: ["Self-Discipline", "Learning Agility", "Initiative"] },
            { text: "Seek out a mentor or expert who can guide you through the learning process.", strengths: ["Networking", "Open-mindedness", "Humility"] },
            { text: "Practice consistently, even when it's challenging, to build proficiency.", strengths: ["Perseverance", "Dedication", "Discipline"] }
        ]
    },
    {
        text: "You're mediating a disagreement between two friends or colleagues.",
        choices: [
            { text: "Listen to both sides impartially, ensuring everyone feels heard and understood.", strengths: ["Empathy", "Active Listening", "Fairness"] },
            { text: "Identify the core issues causing the conflict and propose common ground or solutions.", strengths: ["Problem-Solving", "Conflict Resolution", "Analytical Thinking"] },
            { text: "Encourage open communication and help them find a resolution themselves.", strengths: ["Facilitation", "Communication", "Diplomacy"] }
        ]
    },
    {
        text: "You have a great idea, but you're unsure how to get others on board.",
        choices: [
            { text: "Develop a clear, compelling pitch that highlights the benefits and addresses potential concerns.", strengths: ["Communication", "Persuasion", "Strategic Thinking"] },
            { text: "Seek feedback from trusted individuals to refine your idea and presentation.", strengths: ["Open-mindedness", "Collaboration", "Self-awareness"] },
            { text: "Find a champion or advocate who can help you promote the idea to key decision-makers.", strengths: ["Networking", "Influence", "Proactiveness"] }
        ]
    },
    {
        text: "You're organizing a large event or gathering.",
        choices: [
            { text: "Create a detailed plan, including timelines, budgets, and task assignments.", strengths: ["Planning", "Organization", "Detail-Oriented"] },
            { text: "Delegate tasks effectively to team members, trusting their abilities.", strengths: ["Delegation", "Trust", "Leadership"] },
            { text: "Anticipate potential problems and develop contingency plans.", strengths: ["Foresight", "Problem-Solving", "Risk Management"] }
        ]
    },
    {
        text: "You receive constructive criticism on your work. How do you react?",
        choices: [
            { text: "Listen attentively, ask clarifying questions, and thank the person for their feedback.", strengths: ["Open-mindedness", "Humility", "Active Listening"] },
            { text: "Analyze the feedback objectively to identify areas for improvement.", strengths: ["Analytical Thinking", "Self-awareness", "Learning Agility"] },
            { text: "Implement the suggested changes and follow up to show your progress.", strengths: ["Action-Oriented", "Responsibility", "Improvement-Oriented"] }
        ]
    },
    {
        text: "You're working on a long-term project that requires sustained effort and focus.",
        choices: [
            { text: "Break the project into smaller milestones and celebrate each accomplishment.", strengths: ["Goal-Oriented", "Motivation", "Planning"] },
            { text: "Maintain a consistent routine and minimize distractions to stay on track.", strengths: ["Self-Discipline", "Focus", "Time Management"] },
            { text: "Seek inspiration and new perspectives when you feel your motivation waning.", strengths: ["Resilience", "Creativity", "Optimism"] }
        ]
    },
    {
        text: "You encounter a new technology or tool that could significantly improve your workflow.",
        choices: [
            { text: "Dive deep into the documentation and experiment with its features to master it.", strengths: ["Learning Agility", "Curiosity", "Initiative"] },
            { text: "Identify key benefits and present a case for its adoption to your team or organization.", strengths: ["Innovation", "Persuasion", "Strategic Thinking"] },
            { text: "Share your findings and help others learn how to use the new tool effectively.", strengths: ["Teaching", "Collaboration", "Knowledge Sharing"] }
        ]
    },
    {
        text: "You need to make a difficult decision with incomplete information.",
        choices: [
            { text: "Gather as much relevant information as possible, even if it's limited, to inform your choice.", strengths: ["Research", "Analytical Thinking", "Due Diligence"] },
            { text: "Weigh the potential risks and rewards carefully, considering various outcomes.", strengths: ["Risk Assessment", "Decision-Making", "Foresight"] },
            { text: "Trust your intuition and past experiences to guide your judgment.", strengths: ["Intuition", "Experience", "Confidence"] }
        ]
    },
    {
        text: "You're tasked with presenting complex information to a non-technical audience.",
        choices: [
            { text: "Simplify jargon and use analogies or visual aids to make it understandable.", strengths: ["Communication", "Clarity", "Teaching"] },
            { text: "Focus on the key takeaways and the practical implications for your audience.", strengths: ["Strategic Thinking", "Audience Awareness", "Conciseness"] },
            { text: "Practice your presentation to ensure a smooth and engaging delivery.", strengths: ["Preparation", "Public Speaking", "Confidence"] }
        ]
    },
    {
        text: "You notice a process at work that could be made more efficient.",
        choices: [
            { text: "Analyze the current process to identify bottlenecks and areas for improvement.", strengths: ["Analytical Thinking", "Efficiency", "Problem-Solving"] },
            { text: "Propose a new, streamlined process and outline its benefits.", strengths: ["Innovation", "Proactiveness", "Persuasion"] },
            { text: "Volunteer to lead the implementation of the new process.", strengths: ["Initiative", "Leadership", "Action-Oriented"] }
        ]
    },
    {
        text: "You're feeling overwhelmed by your workload.",
        choices: [
            { text: "Prioritize tasks, focusing on the most critical items first.", strengths: ["Prioritization", "Time Management", "Organization"] },
            { text: "Delegate tasks to others if possible, or ask for help.", strengths: ["Delegation", "Collaboration", "Self-awareness"] },
            { text: "Take short breaks to recharge and maintain focus.", strengths: ["Self-Care", "Resilience", "Mindfulness"] }
        ]
    },
    {
        text: "You need to motivate a discouraged team member.",
        choices: [
            { text: "Listen to their concerns and offer empathetic support.", strengths: ["Empathy", "Active Listening", "Supportiveness"] },
            { text: "Remind them of their past successes and the value they bring to the team.", strengths: ["Encouragement", "Positive Reinforcement", "Recognition"] },
            { text: "Help them break down their challenges into smaller, more manageable steps.", strengths: ["Problem-Solving", "Coaching", "Practicality"] }
        ]
    },
    {
        text: "You're faced with a creative block on a project.",
        choices: [
            { text: "Step away from the problem and engage in an unrelated activity to clear your mind.", strengths: ["Creativity", "Mindfulness", "Self-Care"] },
            { text: "Brainstorm ideas with others, encouraging a free flow of thoughts.", strengths: ["Collaboration", "Creativity", "Open-mindedness"] },
            { text: "Research different approaches or examples to spark new inspiration.", strengths: ["Resourcefulness", "Learning Agility", "Curiosity"] }
        ]
    },
    {
        text: "You need to give difficult feedback to a colleague.",
        choices: [
            { text: "Focus on specific behaviors and their impact, rather than personal attacks.", strengths: ["Objectivity", "Communication", "Tact"] },
            { text: "Deliver the feedback privately and offer solutions or support.", strengths: ["Empathy", "Discretion", "Problem-Solving"] },
            { text: "Ensure the feedback is timely and actionable.", strengths: ["Timeliness", "Action-Oriented", "Directness"] }
        ]
    },
    {
        text: "You're asked to take on a new responsibility outside your comfort zone.",
        choices: [
            { text: "Embrace the challenge as an opportunity for growth and learning.", strengths: ["Growth Mindset", "Courage", "Learning Agility"] },
            { text: "Seek guidance from those with experience in that area.", strengths: ["Humility", "Networking", "Open-mindedness"] },
            { text: "Break down the new responsibility into smaller, manageable learning objectives.", strengths: ["Planning", "Organization", "Self-Discipline"] }
        ]
    },
    {
        text: "You need to persuade a group to adopt a new strategy.",
        choices: [
            { text: "Present compelling data and evidence to support your arguments.", strengths: ["Analytical Thinking", "Persuasion", "Data-Driven"] },
            { text: "Address potential objections proactively and offer solutions.", strengths: ["Foresight", "Problem-Solving", "Confidence"] },
            { text: "Tailor your message to resonate with the specific interests of each stakeholder.", strengths: ["Audience Awareness", "Communication", "Influence"] }
        ]
    },
    {
        text: "You're working on a project that requires meticulous attention to detail.",
        choices: [
            { text: "Create checklists and double-check your work to ensure accuracy.", strengths: ["Detail-Oriented", "Accuracy", "Thoroughness"] },
            { text: "Set aside dedicated time for focused work without interruptions.", strengths: ["Focus", "Discipline", "Time Management"] },
            { text: "Ask a colleague to review your work for errors or omissions.", strengths: ["Collaboration", "Quality Assurance", "Humility"] }
        ]
    },
    {
        text: "You need to manage multiple competing priorities.",
        choices: [
            { text: "Create a clear priority list and stick to it, adjusting as needed.", strengths: ["Prioritization", "Organization", "Decision-Making"] },
            { text: "Communication openly with stakeholders about your workload and deadlines.", strengths: ["Communication", "Transparency", "Boundary Setting"] },
            { text: "Break down large tasks into smaller, more manageable steps.", strengths: ["Planning", "Efficiency", "Problem-Solving"] }
        ]
    },
    {
        text: "You encounter a setback or failure in a personal endeavor.",
        choices: [
            { text: "Analyze what went wrong and learn from the experience.", strengths: ["Resilience", "Learning Agility", "Self-reflection"] },
            { text: "Maintain a positive outlook and focus on future opportunities.", strengths: ["Optimism", "Perseverance", "Growth Mindset"] },
            { text: "Seek support and encouragement from friends or mentors.", strengths: ["Networking", "Vulnerability", "Seeking Help"] }
        ]
    },
    {
        text: "You need to inspire your team to achieve an ambitious goal.",
        choices: [
            { text: "Paint a clear vision of success and the positive impact of their work.", strengths: ["Visionary", "Inspiration", "Communication"] },
            { text: "Empower team members by giving them autonomy and ownership.", strengths: ["Empowerment", "Trust", "Leadership"] },
            { text: "Recognize and celebrate small wins along the way to maintain momentum.", strengths: ["Motivation", "Recognition", "Positive Reinforcement"] }
        ]
    },
    {
        text: "You're faced with a moral dilemma at work or in your personal life.",
        choices: [
            { text: "Consult your personal values and ethical principles to guide your decision.", strengths: ["Integrity", "Ethics", "Self-awareness"] },
            { text: "Seek advice from trusted individuals, considering different perspectives.", strengths: ["Open-mindedness", "Wisdom", "Seeking Counsel"] },
            { text: "Consider the long-term consequences of each possible action.", strengths: ["Foresight", "Responsibility", "Decision-Making"] }
        ]
    },
    {
        text: "You need to adapt to a new cultural environment.",
        choices: [
            { text: "Actively learn about the local customs, traditions, and social norms.", strengths: ["Cultural Awareness", "Learning Agility", "Curiosity"] },
            { text: "Be open to new experiences and try to immerse yourself in the local way of life.", strengths: ["Adaptability", "Open-mindedness", "Flexibility"] },
            { text: "Seek out opportunities to interact with locals and build relationships.", strengths: ["Social Intelligence", "Networking", "Communication"] }
        ]
    },
    {
        text: "You're asked to innovate and come up with groundbreaking ideas.",
        choices: [
            { text: "Engage in brainstorming sessions, encouraging wild and unconventional ideas.", strengths: ["Creativity", "Innovation", "Open-mindedness"] },
            { text: "Research emerging trends and technologies to identify new possibilities.", strengths: ["Foresight", "Curiosity", "Analytical Thinking"] },
            { text: "Prototype and test ideas quickly to gather feedback and iterate.", strengths: ["Experimentation", "Action-Oriented", "Resilience"] }
        ]
    }
];

// Utility function to shuffle an array
const shuffleArray = (array) => {
    const newArray = [...array]; // Create a shallow copy to avoid modifying the original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
};

const App = () => {
    // State variables using React's useState hook
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [strengthsTally, setStrengthsTally] = useState({});
    const [shuffledScenarios, setShuffledScenarios] = useState([]);
    const [gameStarted, setGameStarted] = useState(false); // New state to control game visibility
    const [showWelcome, setShowWelcome] = useState(true); // New state for welcome screen

    // Function to start or restart the game
    const startGame = useCallback(() => {
        setCurrentScenarioIndex(0);
        setStrengthsTally({});
        setShuffledScenarios(shuffleArray(originalScenarios)); // Shuffle scenarios on start
        setGameStarted(true); // Show game area
        setShowWelcome(false); // Hide welcome screen
    }, []);

    // Function to show welcome screen
    const showWelcomeScreen = useCallback(() => {
        setGameStarted(false);
        setShowWelcome(true);
    }, []);

    // Effect to initialize shuffled scenarios when component mounts
    useEffect(() => {
        // Initialize shuffled scenarios on first load
        if (shuffledScenarios.length === 0) {
            setShuffledScenarios(shuffleArray(originalScenarios));
        }
    }, [shuffledScenarios.length]); // Include dependency

    // Calculate progress for the progress bar
    const totalScenarios = shuffledScenarios.length;
    const completedScenarios = currentScenarioIndex;
    const percentage = totalScenarios > 0 ? (completedScenarios / totalScenarios) * 100 : 0;

    // Determine if the game is over
    const isGameOver = currentScenarioIndex >= totalScenarios && totalScenarios > 0;

    // Handle user's choice with animation feedback
    const handleChoice = useCallback((chosenStrengths) => {
        // Add visual feedback before state change
        setStrengthsTally(prevTally => {
            const newTally = { ...prevTally };
            chosenStrengths.forEach(strength => {
                newTally[strength] = (newTally[strength] || 0) + 1;
            });
            return newTally;
        });
        
        // Add slight delay for better UX
        setTimeout(() => {
            setCurrentScenarioIndex(prevIndex => prevIndex + 1);
        }, 150);
    }, []);

    // Keyboard navigation effect
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!gameStarted || isGameOver) return;
            
            const currentScenario = shuffledScenarios[currentScenarioIndex];
            if (!currentScenario) return;
            
            // Handle number keys 1-3 for choice selection
            const keyNum = parseInt(event.key);
            if (keyNum >= 1 && keyNum <= currentScenario.choices.length) {
                const choice = currentScenario.choices[keyNum - 1];
                handleChoice(choice.strengths);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, isGameOver, currentScenarioIndex, shuffledScenarios, handleChoice]);

    // Prepare results for display
    const sortedStrengths = Object.entries(strengthsTally)
        .sort(([, countA], [, countB]) => countB - countA);
    const topStrengths = sortedStrengths.slice(0, Math.min(sortedStrengths.length, 5)); // Show top 5

    return (
        <div className="flex justify-center items-center min-h-screen p-2 sm:p-4 box-border select-text">
            <div className="bg-white backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl w-full text-center flex flex-col gap-6 sm:gap-8 relative overflow-hidden select-text">
               
                {/* Welcome Screen */}
                {showWelcome && (
                    <div className="animate-fadeIn relative z-10">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-normal py-2 px-4 sm:px-8">
                                Discover Your Superpowers!
                            </h2>
                            <p className="text-lg sm:text-xl md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-6xl mx-auto px-2">
                                Embark on a journey of self-discovery through real-life scenarios and unlock your unique strengths
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
                                <button
                                    className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 sm:py-5 px-8 sm:px-10 rounded-2xl text-lg sm:text-xl font-bold border-none cursor-pointer transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 overflow-hidden"
                                    onClick={startGame}
                                    aria-label="Start the strength discovery game"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <Rocket className="mr-2 sm:mr-3" size={20} />
                                        Start Your Journey
                                    </span>
                                </button>
                                <div className="flex items-center text-gray-500 bg-white/60 rounded-full px-3 sm:px-4 py-2">
                                    <Clock className="mr-2" size={18} />
                                    <span className="text-xs sm:text-sm font-medium">Takes about 5-10 minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border-2 border-blue-200 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                        <Target size={32} className="text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-4 text-xl">Discover Strengths</h3>
                                    <p className="text-gray-600 leading-relaxed text-md">
                                        Navigate through <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{originalScenarios.length}</span> unique scenarios to uncover your natural talents
                                    </p>
                                </div>
                            </div>
                            <div className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border-2 border-green-200 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                        <Brain size={32} className="text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-4 text-xl">Real-World Situations</h3>
                                    <p className="text-gray-600 leading-relaxed text-md">
                                        Face authentic scenarios from work, personal life, and social interactions
                                    </p>
                                </div>
                            </div>
                            <div className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border-2 border-purple-200 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                        <BarChart3 size={32} className="text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-4 text-xl">Detailed Insights</h3>
                                    <p className="text-gray-600 leading-relaxed text-md">
                                        Get personalized results with career and personal life applications
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 backdrop-blur-lg p-8 rounded-3xl mb-10 border-2 border-blue-400/30 shadow-sm">
                            <h3 className="font-bold text-white mb-8 flex items-center justify-center text-2xl">
                                <div className="w-10 h-10 bg-white backdrop-blur-sm rounded-xl flex items-center justify-center mr-3 border-2 border-blue-600">
                                    <Info className="text-blue-600" size={23} />
                                </div>
                                How It Works
                            </h3>
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 text-left text-gray-600">
                                <div className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl mr-4 font-bold transition-all duration-300">1</div>
                                    <span className="font-semibold text-gray-800">Read each scenario carefully</span>
                                </div>
                                <div className="hidden md:block text-3xl text-white font-light">→</div>
                                <div className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-green-200 transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl mr-4 font-bold transition-all duration-300">2</div>
                                    <span className="font-semibold text-gray-800">Choose your natural response</span>
                                </div>
                                <div className="hidden md:block text-3xl text-white font-light">→</div>
                                <div className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl mr-4 font-bold transition-all duration-300">3</div>
                                    <span className="font-semibold text-gray-800">Discover your top strengths</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Area */}
                {!isGameOver && gameStarted && (
                    <div className="game-area animate-slideIn relative z-10">
                        <div className="mb-6 sm:mb-8">
                            <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                                <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
                                    <p className="text-base sm:text-lg font-semibold text-gray-700 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Scenario <span className="text-purple-600">{completedScenarios + 1}</span>
                                        <span className="text-blue-400 mx-1 sm:mx-2">/</span>
                                        <span className="text-blue-600">{totalScenarios}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={showWelcomeScreen}
                                    className="text-blue-500 hover:text-blue-700 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm border border-blue-200"
                                    aria-label="Return to welcome screen"
                                >
                                    ← Back to Home
                                </button>
                            </div>
                            
                            <div className="w-full bg-gray-100 backdrop-blur-md rounded-2xl sm:rounded-3xl h-10 sm:h-12 mb-4 sm:mb-6 shadow-md border border-gray-200 overflow-hidden relative">
                                {/* Progress fill */}
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg transition-all duration-1000 ease-out relative overflow-hidden"
                                    style={{ 
                                        width: `${percentage}%`, 
                                        minWidth: percentage > 0 ? '5rem' : '3rem'
                                    }}
                                >
                                    {/* Animated text */}
                                    <span className="relative z-20 drop-shadow-sm font-black tracking-wide text-sm sm:text-base">
                                        {Math.round(percentage)}%
                                    </span>
                                </div>
                            </div>
                            
                            {/* Enhanced milestone celebrations */}
                            {Math.round(percentage) === 25 && (
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold animate-bounce shadow-md">
                                        <Award className="mr-2" size={20} /> Quarter way there!
                                    </div>
                                </div>
                            )}
                            {Math.round(percentage) === 50 && (
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold animate-bounce shadow-md">
                                        <CheckCircle className="mr-2" size={20} /> Halfway done!
                                    </div>
                                </div>
                            )}
                            {Math.round(percentage) === 75 && (
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold animate-bounce shadow-md">
                                        <Zap className="mr-2" size={20} /> Almost finished!
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-6 sm:mb-10">
                            <div className="relative group bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-10 border-2 border-blue-400/30 shadow-sm overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium sm:font-semibold text-white leading-relaxed">
                                        {shuffledScenarios[currentScenarioIndex]?.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4 md:space-y-5">
                            {shuffledScenarios[currentScenarioIndex]?.choices.map((choice, index) => (
                                <button
                                    key={index}
                                    className="group relative w-full bg-white/95 backdrop-blur-lg hover:bg-white gradient-border-blue hover:border-blue-200 text-gray-800 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl text-sm sm:text-base md:text-lg font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-0 active:outline-none text-left overflow-hidden select-none"
                                    onClick={() => handleChoice(choice.strengths)}
                                    onTouchStart={() => {}}
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                    aria-label={`Choice ${index + 1}: ${choice.text}. Press ${index + 1} on keyboard to select.`}
                                >
                                    <div className="relative z-10 flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-white transition-all duration-300 group-hover:scale-110 text-sm sm:text-base">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 pt-1 sm:pt-2">
                                            <p className="leading-relaxed text-gray-900 group-hover:text-gray-800 transition-colors font-medium">{choice.text}</p>
                                        </div>
                                        <div className="flex-shrink-0 mt-1 sm:mt-2">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                                <ArrowRight className="text-blue-600 group-hover:text-purple-600 transition-colors" size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        
                        {/* Enhanced navigation hints */}
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-3 sm:gap-0">
                            <div className="sm:hidden bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 text-gray-600 font-medium shadow-sm border border-gray-200/50 flex items-center">
                                <Lightbulb className="mr-2" size={14} />
                                <span>Tap any option to continue</span>
                            </div>
                            <div className="hidden sm:block bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-gray-600 font-medium items-center">
                                <Keyboard className="mr-2" size={14} />
                                <span>Use keys 1-{shuffledScenarios[currentScenarioIndex]?.choices.length || 3} or click to select</span>
                            </div>
                            <div className="bg-gray-100/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-white font-medium shadow-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                {completedScenarios + 1} of {totalScenarios}
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Area */}
                {isGameOver && (
                    <div className="animate-fadeIn relative z-10">
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="mb-4 sm:mb-6 animate-bounce drop-shadow-lg flex justify-center">
                                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 sm:p-4 rounded-full">
                                    <Trophy size={56} className="text-white sm:w-[76px] sm:h-[76px]" />
                                </div>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-normal py-2 px-4 sm:px-8">
                                Your Top Strengths Discovered!
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-2">
                                Discover how each of your unique strengths can transform your personal relationships and accelerate your career success
                            </p>
                            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4 sm:mt-6"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 mb-12">
                            {topStrengths.length > 0 ? (
                                topStrengths.map(([strength], index) => {
                                    const definition = strengthDefinitions[strength];
                                    
                                    // Enhanced strength icons mapping
                                    const strengthIcons = {
                                        "Leadership": Crown, "Adaptability": RotateCcw, "Collaboration": Handshake, 
                                        "Problem-Solving": Puzzle, "Creativity": Palette, "Empathy": Heart, 
                                        "Communication": MessageCircle, "Analytical Thinking": Search, "Detail-Oriented": Target, 
                                        "Resilience": Zap, "Social Intelligence": Star, "Proactiveness": Rocket,
                                        "Persuasion": MessageCircle, "Conflict Resolution": Scale, "Initiative": Sparkles,
                                        "Planning": ClipboardList, "Learning Agility": BookOpen, "Resourcefulness": Wrench,
                                        "Networking": Users, "Strategic Thinking": TrendingUp, "Innovation": Lightbulb,
                                        "Teaching": GraduationCap, "Focus": Eye, "Confidence": Award, "Time Management": Clock,
                                        "Organization": ClipboardList, "Research": Microscope, "Experience": Trophy,
                                        "Motivation": Zap, "Curiosity": Search, "Growth Mindset": TrendingUp,
                                        "Data-Driven": BarChart3, "Accuracy": Target, "Integrity": Shield,
                                        "Visionary": Binoculars, "Trust": Handshake, "Wisdom": BookOpen,
                                        "Frugality": DollarSign, "Prioritization": Layers, "Decision-Making": Flag,
                                        "Efficiency": Settings, "Flexibility": RefreshCw, "Optimism": Sun,
                                        "Open-mindedness": Globe, "Humility": User, "Perseverance": Mountain,
                                        "Dedication": Heart, "Discipline": Calendar, "Self-Discipline": Focus,
                                        "Action-Oriented": Play, "Responsibility": Shield, "Improvement-Oriented": TrendingUp,
                                        "Goal-Oriented": Target, "Knowledge Sharing": Share2, "Due Diligence": FileCheck,
                                        "Risk Assessment": AlertTriangle, "Intuition": Brain, "Clarity": Eye,
                                        "Audience Awareness": Users, "Conciseness": FileText, "Preparation": ClipboardList,
                                        "Public Speaking": Mic, "Self-Care": Coffee, "Mindfulness": TreePine,
                                        "Supportiveness": Heart, "Encouragement": Smile, "Positive Reinforcement": Award,
                                        "Recognition": Star, "Coaching": UserCheck, "Practicality": Wrench,
                                        "Courage": Shield, "Thoroughness": CheckCircle, "Transparency": Eye,
                                        "Boundary Setting": Scale, "Self-reflection": User, "Vulnerability": Heart,
                                        "Seeking Help": Handshake, "Inspiration": Sparkles, "Empowerment": Crown,
                                        "Ethics": Scale, "Seeking Counsel": MessageCircle, "Foresight": Compass,
                                        "Cultural Awareness": Globe, "Experimentation": Activity, "Observation": Search,
                                        "Active Listening": Headphones, "Fairness": Scale, "Facilitation": Users,
                                        "Diplomacy": Handshake, "Influence": Star, "Delegation": Users,
                                        "Risk Management": AlertTriangle, "Self-awareness": User
                                    };
                                    
                                    const IconComponent = strengthIcons[strength] || Star;
                                    
                                    const colors = [
                                        'from-blue-500 via-blue-600 to-cyan-600', 
                                        'from-green-500 via-emerald-600 to-teal-600', 
                                        'from-purple-500 via-violet-600 to-indigo-600', 
                                        'from-orange-500 via-amber-600 to-yellow-600', 
                                        'from-pink-500 via-rose-600 to-red-600'
                                    ];
                                    const cardGradient = colors[index % colors.length];
                                    
                                    return (
                                        <div key={strength} 
                                             className="group relative overflow-hidden rounded-2xl animate-slideUp bg-white border border-gray-200 transition-all duration-300 hover:shadow-md"
                                             style={{ animationDelay: `${index * 0.1}s` }}>
                                            
                                            {/* Main flex container - left (blue section) and right (content) */}
                                            <div className="flex flex-col lg:flex-row min-h-full">
                                                
                                                {/* Left side - Blue header section */}
                                                <div className={`bg-gradient-to-br ${cardGradient} text-white p-6 relative overflow-hidden flex-shrink-0 lg:w-80 flex flex-col justify-center`}>
                                                    {/* Top ranking badge */}
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <div className={`w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                                            #{index + 1}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-col items-center text-center space-y-4">
                                                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                            <IconComponent size={32} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-2xl mb-2">{strength}</h3>
                                                            <div className="text-white/80 text-sm font-medium">Top Strength #{index + 1}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Right side - Content sections */}
                                                {definition && (
                                                    <div className="flex-1 p-4 bg-gray-50/30 space-y-2 flex flex-col justify-center text-left">
                                                        {/* Definition row */}
                                                        <div className="bg-white pl-4 pr-4 py-2 rounded-r-lg">
                                                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-md">
                                                                <BookOpen className="text-blue-600 mr-2" size={20} />
                                                                Definition
                                                            </h4>
                                                            <p className="text-gray-700 text-md leading-relaxed">{definition.description}</p>
                                                        </div>
                                                        
                                                        {/* Personal Life row */}
                                                        <div className="bg-white pl-4 pr-4 py-2 rounded-r-lg">
                                                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-md">
                                                                <User className="text-green-600 mr-2" size={20} />
                                                                Personal Life
                                                            </h4>
                                                            <p className="text-gray-700 text-md leading-relaxed">{definition.personal}</p>
                                                        </div>
                                                        
                                                        {/* Career row */}
                                                        <div className="bg-white pl-4 pr-4 py-2 rounded-r-lg">
                                                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                                                                <Briefcase className="text-purple-600 mr-2" size={20} />
                                                                Career
                                                            </h4>
                                                            <p className="text-gray-700 text-md leading-relaxed">{definition.career}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center py-16 bg-white/90 backdrop-blur-lg rounded-3xl border-2 border-gray-200/60">
                                    <div className="text-8xl mb-8 animate-bounce">🤔</div>
                                    <p className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                                        Hmm, that's interesting...
                                    </p>
                                    <p className="text-xl text-gray-600 font-medium">
                                        We couldn't identify specific strengths this round. Try playing again for different scenarios!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Restart Button (visible when game is over) */}
                {isGameOver && (
                    <div className="flex justify-center items-center relative z-10">
                        <button
                            className="group relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white py-4 sm:py-5 px-8 sm:px-10 rounded-2xl text-lg sm:text-xl font-bold border-none cursor-pointer transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300/50 overflow-hidden"
                            onClick={startGame}
                            aria-label="Play the strength game again"
                        >
                            <span className="relative z-10 flex items-center">
                                <RotateCw className="mr-2 sm:mr-3" size={20} />
                                Play Again!
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;