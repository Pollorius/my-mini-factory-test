import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 230,
    flexGrow: 1
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 18,
    color: '#404040',
    marginTop: 5,
    marginBottom: 3
  },
  img: {
    height: 230,
    maxWidth: 230,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    opacity: '0.85'
  },
  btnContainer: {
    height: 220,
    display: 'flex',
    justifyContent: 'space-between'
  },
  btnSubContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnBg: {
    backgroundColor: '#E0E0E0',
    borderRadius: '10px',
    height: '20px',
    width: '20px',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0.85',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
  },
  btnRight: {
    borderColor: 'transparent transparent transparent #444',
    borderStyle: 'solid',
    borderWidth: '6px 0px 6px 12px',
    opacity: '0.85',
    height: '0px',
    width: '5px',
    marginTop: '4px',
    marginLeft: '5px'
  },
  btnLeft: {
    borderColor: 'transparent #444 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '6px 12px 6px 0px',
    opacity: '0.85',
    height: '0px',
    width: '5px',
    marginTop: '4px',
    marginRight: '5px'
  },
  gradient: {
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(255,255,255, 0) 20%)',
    width: '230px',
    height: '230px',
    opacity: '0.8'
  },
  stepper: {
    height: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    fontSize: 12,
    color: '#fff'
  }
}))

export default function CarrouselCard ({ images, name }) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.img} image={images[activeStep].thumbnail.url}>
          <div className={classes.gradient}>
            <div className={classes.btnContainer}>
              <div className={classes.btnSubContainer}>
                <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                  <div className={classes.btnBg}>
                    <div className={classes.btnLeft} />
                  </div>
                </Button>
              </div>
              <div className={classes.btnSubContainer}>
                <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  <div className={classes.btnBg}>
                    <div className={classes.btnRight} />
                  </div>
                </Button>
              </div>
            </div>
            <div className={classes.stepper}>
              Showing picture {activeStep + 1}/{maxSteps}
            </div>
          </div>
        </CardMedia>
      </CardActionArea>
      <Paper square elevation={0} className={classes.footer}>
        <Typography>{name}</Typography>
        <Typography>$xx,xx</Typography>
      </Paper>
    </Card>
  )
}
