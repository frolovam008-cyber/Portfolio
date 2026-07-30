export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -100
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.7
    }
  }
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 100
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.7
    }
  }
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};