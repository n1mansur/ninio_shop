import {
  Box,
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Container from '@/components/UI/Container'
import Logo from '@/components/UI/Logo'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useResponsive'
import styles from './styles.module.scss'
import { CartIcon, DeleteIcon, HeartIcon, MBurgerIcon, SearchIcon } from '@/components/svg'
import { productsService } from '@/services/productsService'


const Header = ({ data, category }) => {
  const contentRef = useRef(null);
  const catalogRef = useRef(null);
  const catalogBtnRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false)
  const [searchProducts, setSearchProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [categoryValue, setCategoryValue] = useState()
  const md = useResponsive('md')
  const categoryFilter = category?.filter(el => !el.categories_id) || []
  const filteredCategory = category?.filter(el => el.categories_id === categoryValue) || []

  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        inputRef.current.value = ''
        setSearchProducts([])
      }
      if (catalogRef.current && !catalogRef.current.contains(event.target)
        && catalogBtnRef.current && !catalogBtnRef.current.contains(event.target)) {
        document.body.style.overflow = "auto";
        setOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const click = () => {
    inputRef.current.value = ''
    setSearchProducts([])
  }

  const catalogFn = (e, toggle = 'auto') => {
    md && e?.stopPropagation()
    setOpen(old => !old)
    document.body.style.overflow = toggle;
    setCategoryValue()
  }

  const onChange = (e) => {
    const value = e.target.value
    value ? productsService.getList(
      {
        data:
        {
          with_relations: true,
          status: true,
          name: value
        },
        offset: 0
      }
    ).then(res => setSearchProducts(res.data.response))
      : setSearchProducts([])
    setSearchValue(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    window.location.href = `/products/name?id=${searchValue}`
  }

  const linkLogo = (
    <Link className={styles.linkLogo} href="/">
      <Logo className={styles.logo} />
    </Link>
  )
  const catalogBtn = (
    <>
      {!md
        ? <Button ref={catalogBtnRef} onClick={() => catalogFn("hidden")} className={styles.catalogBtn}>
          <MBurgerIcon color={'#fff'} />
          {!md && 'Каталог'}
        </Button>
        : !open
          ? <Button ref={catalogBtnRef} onClick={(e) => catalogFn(e, "hidden")} className={styles.catalogBtn}>
            <MBurgerIcon color={'#fff'} />
            {!md && 'Каталог'}
          </Button>
          : <Button ref={catalogBtnRef} onClick={() => catalogFn()} className={styles.catalogBtn}>
            <DeleteIcon color='#fff' />
          </Button>}
    </>
  )
  const form = (
    <Box
      className={styles.form}
      ref={contentRef}
    >
      <form
        onSubmit={(e) => onSubmit(e)}
        className={styles.formControl}
        onChange={onChange}>
        <Input borderRightRadius={'0'} className={styles.input} ref={inputRef} type="text" placeholder='Поиск товаров' />
        <Button
          //onClick={() => window.location.href = `/products/name?id=${searchValue}`}
          borderLeftRadius={'0'}
          className={styles.formBtn}
          type="submit">
          <SearchIcon />
        </Button>
      </form>
      {searchProducts.length > 0 &&
        <Box className={styles.searchList}>
          {searchProducts.map((el) => (
            <Link href={`/product/${el.guid}`} onClick={() => click()} className={styles.searchItem} key={el.guid}>
              <SearchIcon color={'black'} />
              <span className={styles.span}>{el.name}</span>
            </Link>
          ))}
        </Box>
      }
    </Box>
  )
  const headerBtns = (
    <Box className={styles.headerBtns}>
      <Button onClick={() => window.location.href = '/favourites'} className={styles.headerBtn}>
        <HeartIcon />
        {!md && 'Избранное'}
      </Button>
      <Button onClick={() => window.location.href = '/cart'} className={styles.headerBtn}>
        <CartIcon />
        {!md && 'Корзина'}
      </Button>
    </Box>
  )
  return (
    <>
      <Box className={styles.header}>

        <Container className={styles.container}>
          {!md ? (
            <>
              {linkLogo}
              {catalogBtn}
              {form}
              {headerBtns}
            </>
          ) : (
            <Box className={styles.mobileSection}>
              <Box>
                {catalogBtn}
                {linkLogo}
                {headerBtns}
              </Box>
              {form}
            </Box>
          )}
        </Container>
      </Box>
      <Box className={searchProducts.length > 0 ? styles.fon : ''}></Box>
      {open && <Box className={styles.catalogSection}>
        <Box className={styles.catalogFon}>
          <Box ref={catalogRef} className={styles.box}>
            <Box className={styles.list}>
              {categoryFilter.map(el => (
                <Box
                  onMouseEnter={() => { setCategoryValue(el.guid) }}
                  //onClick={() => setCategoryValue(el.guid)}
                  className={styles.item}
                  key={el.guid}>
                  <Link href={`/products/main_category?id=${el.guid}`} onClick={() => catalogFn()} color={'#000'}>{el.name}</Link>
                  {!md && <ChevronRightIcon />}
                </Box>
              ))}
            </Box >
            {filteredCategory &&
              <Box className={styles.list}>
                {filteredCategory?.map(el => (
                  <Link href={`/products/categories_id?id=${el.guid}`} className={styles.item} onClick={() => catalogFn()} key={el.guid}>
                    {el.name}
                    <ChevronRightIcon />
                  </Link>
                ))}
              </Box >}
          </Box>
        </Box>
      </Box>}
    </>
  )
}
export default Header
