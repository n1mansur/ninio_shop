import React from 'react'
import styles from './styles.module.scss'
import { Box, Button } from '@chakra-ui/react'

export default function Pagination({
  totalTodos,
  count,
  setCurrentPage,
  setCount,
  currentPage,
}) {
  let arr = []

  for (let i = 1; i <= Math.ceil(totalTodos / count); i++) {
    arr.push(i)
  }

  return (
    <div className={styles.pagination}>
      <Box  display={'flex'} justifyContent={'space-between'} gap={'20px'}>
        {count != 10 && <Button onClick={() => setCount(10)}>10</Button>}
        {count != 20 && <Button onClick={() => setCount(20)}>20</Button>}
        {count != 30 && <Button onClick={() => setCount(30)}>30</Button>}
        {count != 40 && <Button onClick={() => setCount(40)}>40</Button>}
        {count != 50 && <Button onClick={() => setCount(50)}>50</Button>}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} gap={'20px'}>
        <button
          onClick={() => setCurrentPage((old) => (old > 1 ? old - 1 : old))}
        >
          prev
        </button>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {arr
            .slice(
              currentPage == 3
                ? currentPage - 3
                : currentPage == 2
                  ? currentPage - 2
                  : currentPage == 1
                    ? currentPage - 1
                    : currentPage - 3,
              currentPage + 2
            )
            .map((el, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(el)}
                  className={el == currentPage ? 'active' : ''}
                >
                  {el}
                </button>
              )
            })}
        </div>
        <button
          onClick={() =>
            setCurrentPage((old) => (currentPage < arr.length ? old + 1 : old))
          }
        >
          next
        </button>
      </Box>
    </div>
  )
}
