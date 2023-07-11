import { motion } from 'framer-motion';

export default function FadeBox({
  children,
  style = {},
  slower,
}: {
  children: React.ReactNode;
  style?: { [key: string]: any };
  slower?: boolean;
}) {
  return (
    <motion.div
      style={{
        boxShadow:
          '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
        ...style,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: [0.12, 0, 0.39, 0], //'easeOut',
          duration: slower ? 0.45 : 0.15,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
