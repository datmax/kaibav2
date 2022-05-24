import { motion } from 'framer-motion'

const connectAnimation = {
  x: [5, 10, 2, 0],
  transition: {
    duration: 0.5,
    type: 'linear',
  },
}

const animations = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
  },
}

export default function ConnectButton() {
  return (
    <motion.p
      whileHover={connectAnimation}
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className=" hover:cursor-pointer hover:text-main"
    >
      Connect
    </motion.p>
  )
}
