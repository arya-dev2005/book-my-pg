
export const collegeData = {
  name: "Haldia Institute of Technology",
  tagline: "Excellence in Innovation and Technology",
  campusImage: "/images/collage/hit.jpg", // Placeholder image
  stats: [
    { label: "Established Year", value: "1995" },
    { label: "Student Strength", value: "5,000+" },
    { label: "Placement %", value: "95%" },
  ],
  about:
    "The Global Institute of Technology is a premier institution dedicated to providing world-class education in engineering and technology. Our mission is to foster a learning environment that promotes innovation, critical thinking, and research. With a sprawling campus and state-of-the-art facilities, we are committed to nurturing the next generation of leaders and innovators.",
  achievements: [
    {
      title: "NAAC 'A++' Grade",
      description: "Accredited with the highest grade for excellence in education.",
    },
    {
      title: "Top 50 in NIRF Rankings",
      description: "Ranked among the top 50 engineering colleges in India.",
    },
    {
      title: "National Sports Champions",
      description: "Winners of the inter-university national sports meet 2023.",
    },
  ],
  courses: {
    undergraduate: [
      {
        name: "B.Tech in Computer Science",
        duration: "4 Years",
        intake: 180,
        eligibility: "10+2 with PCM, JEE Main score",
      },
      {
        name: "B.Tech in Mechanical Engineering",
        duration: "4 Years",
        intake: 120,
        eligibility: "10+2 with PCM, JEE Main score",
      },
    ],
    postgraduate: [
      {
        name: "M.Tech in Artificial Intelligence",
        duration: "2 Years",
        intake: 30,
        eligibility: "B.Tech in relevant field, GATE score",
      },
    ],
    research: [
      {
        name: "Ph.D. in Electronics & Communication",
        duration: "3-5 Years",
        intake: 15,
        eligibility: "M.Tech/M.S. with excellent academic record",
      },
    ],
  },
  facilities: [
    {
      name: "Boys Hostel",
      icon: "👨‍🎓",
      description: "Fully-furnished rooms with modern amenities.",
    },
    {
      name: "Girls Hostel",
      icon: "👩‍🎓",
      description: "Secure and comfortable accommodation for female students.",
    },
    {
      name: "Central Library",
      icon: "📚",
      description: "A vast collection of books, journals, and digital resources.",
    },
    {
      name: "Sports Complex",
      icon: "⚽",
      description: "Facilities for indoor and outdoor sports.",
    },
    { name: "Advanced Labs", icon: "🔬", description: "State-of-the-art laboratories for research." },
    { name: "Campus Wi-Fi", icon: "📶", description: "High-speed internet access across the campus." },
  ],
  faculty: [
    {
      id: "1",
      name: "Dr. Alan Turing",
      department: "Computer Science",
      qualification: "Ph.D. in Computer Science",
      photo: "https://via.placeholder.com/150",
      details: "Specializes in artificial intelligence and theoretical computer science. Published over 50 research papers.",
    },
    {
      id: "2",
      name: "Dr. Marie Curie",
      department: "Physics & Chemistry",
      qualification: "Ph.D. in Physics",
      photo: "https://via.placeholder.com/150",
      details: "A pioneer in radioactivity research and a two-time Nobel prize winner.",
    },
     {
      id: "3",
      name: "Dr. Isaac Newton",
      department: "Mechanical Engineering",
      qualification: "Ph.D. in Mathematics",
      photo: "https://via.placeholder.com/150",
      details: "Expert in classical mechanics, optics, and calculus. Authored several foundational scientific books.",
    },
  ],
  contact: {
    email: "admissions@git.edu",
    phone: "+91-123-456-7890",
    address: "123 Tech Park, Knowledge City, India",
  },
};

export const quickLinks = [
  { id: "about", label: "About College", icon: "ℹ️" },
  { id: "achievements", label: "Achievements", icon: "🏆" },
  { id: "courses", label: "Courses", icon: "📚" },
  { id: "facilities", label: "Hostel & Facilities", icon: "🏢" },
  { id: "faculty", label: "Faculty", icon: "👨‍🏫" },
  { id: "contact", label: "Contact", icon: "📞" },
];
