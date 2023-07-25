import Container from '../Container'
import Logo from '../Logo'
import styles from './index.module.scss'
import { FacebookIcon, InstagramIcon, TelegramIcon } from '@/components/svg'
import { footerService } from '@/services/footerService'
import Maps from './Maps'
import Script from 'next/script'

import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
const Footer = () => {
  const socialsIcons = {
    "telegram": <TelegramIcon />,
    "instagram": <InstagramIcon />,
    "facebook": <FacebookIcon />
  }
  const [footerData, setFooterData] = useState();

  useEffect(() => {
    footerService?.getList({ data: { with_relations: true }, offset: 1, limit: 10 }).then(res => setFooterData(res?.data?.data?.data?.response))
  }, []);

  const numbers = footerData?.filter(el => el?.social_media[0] == 'phone') || []
  const socials = footerData?.filter(el => el?.social_media[0] != 'phone' && el?.social_media[0] != 'email') || []
  const mail = footerData?.filter(el => el?.link.includes('@gmail') || el?.link.includes('@mail')) || []

  return (
    <Box className={styles.footer}>
      <Container className={styles.container}>
        <Box flex={'1'}>
          <Maps />
        </Box>
        <Box className={styles.contacts}>
          {numbers?.length > 0 && <>
            <Heading fontSize={'18px'} fontWeight={'400'} color={'#8198a2'} mb={'16px'}>
              Контакты
            </Heading>
            {numbers.map(number => (
              <Box mb={'20px'} key={number?.guid} display={'flex'} alignItems={'center'} gap={'10px'}>
                <Text
                  as={'p'}
                  display={'inline-block'}
                  dangerouslySetInnerHTML={{ __html: number?.svg_code }}
                ></Text> Телефон: <a href={`tel:${number.link}`}>{number.link}</a>
              </Box>
            ))}
          </>}
          {mail && mail?.map(el => (
            <Box mb={'20px'} key={el?.guid} display={'flex'} alignItems={'center'} gap={'10px'}>
              <Text
                  as={'p'}
                  display={'inline-block'}
                  dangerouslySetInnerHTML={{ __html: el?.svg_code }}
                ></Text>Почта: <a href={`mailto:${el.link}`} target='_blank'>{el.link}</a>
            </Box>
          ))}
          {socials?.length > 0 && <Box className={styles.socials}>
            <Heading fontSize={'18px'} fontWeight={'400'} color={'#8198a2'} mb={'16px'}>
              Присоединяйтесь
            </Heading>
            <Box className={styles.socialsSection}>
              {socials.map(social => (
                <a href={social?.link} key={social.guid}>
                  <Text
                    as={'p'}
                    dangerouslySetInnerHTML={{ __html: social?.svg_code }}
                  ></Text>
                </a>
              ))}
            </Box>
          </Box>}
        </Box>
      </Container>
      <Container className={styles.container}>
        <Link className={styles.linkLogo} href="/">
          <Logo className={styles.logo} />
        </Link>
        <a href=''>©ninioshop 2023. Все права защищены</a>
      </Container>
    </Box>
  )
}
export default Footer
