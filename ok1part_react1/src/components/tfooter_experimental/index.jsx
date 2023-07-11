import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ColoredBox from '../colored-box';

const currentYear = new Date().getFullYear();

export default function TFooter() {
  return (
    <ColoredBox
      component={motion.div}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: 4,
        paddingY: 6,
      }}
    >
      <Box
        sx={{
          marginBottom: 2,
          width: '25%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src='/techwelf.png'
            width={175 * 0.15}
            height={201 * 0.15}
            alt='Techwelf Logo'
          />
          <Typography
            color='text.primary'
            variant='h5'
            component='h2'
            sx={{ paddingLeft: 1 }}
          >
            Techwelf
          </Typography>
        </Box>

        <Typography
          color='text.primary'
          variant='body2'
          component='span'
          sx={{
            marginTop: 2,
          }}
        >
          A Techwelf, Lda é uma empresa criada por vários profissionais
          altamente especializados, com o objetivo de aplicar o conhecimento e a
          experiência adquirida em vários projetos de I&DT, nacionais e
          europeus, ao serviço das empresas e instituições. Através da inovação
          dos processos e produtos, temos como missão contribuir para melhorar a
          qualidade de vida das pessoas e criar um mundo mais eficiente e
          sustentável.
        </Typography>
      </Box>

      <Typography color='text.primary' variant='body2' component='span'>
        © TechWelf {currentYear}. Todos os Direitos Reservados
      </Typography>
    </ColoredBox>
  );
}
