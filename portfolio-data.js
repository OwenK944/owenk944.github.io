// portfolio-data.js
export default [
  // 0) Intro “slide”
  {
    type: 'intro',
    heading: "Hey there, I'm Owen Klea",
    description: "Welcome to my editor-styled portfolio. Scroll to explore my work and watch the timeline scrub along!",
    fillerCount: 40
  },

  // 1) Real projects
  {
    type: 'project',
    title: "Project Alpha",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    assets: ["alpha1.jpg", "alpha2.mp4"]
  },
  {
    type: 'project',
    title: "Project Beta",
    description: "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
    assets: ["beta1.png"]
  },
  {
    type: 'project',
    title: "Project Gamma",
    description: "In condimentum facilisis porta. Sed nec diam eu diam mattis viverra.",
    assets: ["gamma1.jpg", "gamma2.mp4"]
  },
  {
    type: 'project',
    title: "Project Delta",
    description: "Etiam porta sem malesuada magna mollis euismod.",
    assets: []
  },
  {
    type: 'project',
    title: "Project Epsilon",
    description: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
    assets: ["epsilon1.png"]
  },
  {
    type: 'project',
    title: "Project Zeta",
    description: "Cras mattis consectetur purus sit amet fermentum.",
    assets: []
  }
  // … add more 'project' entries here …
];
