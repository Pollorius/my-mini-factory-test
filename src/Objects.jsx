import React, { useEffect, useState } from 'react'
import axios from 'axios'
import credentials from './credentials'
import CarrouselCard from './CarrouselCard'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  objects: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    margin: 10
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  filter: {
    maxWidth: '400px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  filterBtn: {
    border: '1px solid black',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
  }
}))

export default function Objects () {
  const classes = useStyles()
  const theme = useTheme()
  const [data, setData] = useState([])
  const [featured, setFeatured] = useState(false)
  const [currentPage, setCurrentPage] = useState(18)
  const maxPages = getPages()

  useEffect(() => {
    getData()
  }, [currentPage])

  function getData () {
    axios.get(`https://www.myminifactory.com/api/v2/users/MyMiniFactory/objects?key=${credentials.apiKey}&page=${currentPage}&per_page=20`)
      .then((res) => {
        if (res !== undefined) {
          const response = res.data
          setData(response)
        }
      }).catch((e) => {
        console.log(e)
      })
  }
  function getPages () {
    if (data.total_count) {
      return Math.ceil(data.total_count / 20)
    }
  }

  function handleBack () {
    setCurrentPage((currentPage) => currentPage - 1)
  }
  function handleNext () {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  function toggleFeatured (event) {
    setFeatured(true)
  }
  function toggleDefault (event) {
    setFeatured(false)
  }
  return (
    <div>
      <div className={classes.btnContainer}>
        <Button size='small' onClick={handleBack} disabled={currentPage === 1}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Previous Page
        </Button>
        <Typography>{currentPage}/{maxPages}</Typography>
        <Button size='small' onClick={handleNext} disabled={currentPage === maxPages}>
            Next Page
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      </div>
      <div className={classes.filter}>
        <Button className={classes.filterBtn} size='small' onClick={toggleDefault} disabled={!featured}>
          Show All
        </Button>
        <Button className={classes.filterBtn} size='small' onClick={toggleFeatured} disabled={featured}>
          Show Only Featured Objects
        </Button>
      </div>
      {featured
        ? <div className={classes.objects}>
          {data.items &&
      data.items.map(d =>
        d.featured &&
          <CarrouselCard
            key={d.id}
            images={d.images}
            name={d.name}
          />
      )}  </div>

        : <div className={classes.objects}>
          {data.items &&
            data.items.map(d =>
              <CarrouselCard
                key={d.id}
                images={d.images}
                name={d.name}
              />
            )}
        </div>}

    </div>
  )
}
