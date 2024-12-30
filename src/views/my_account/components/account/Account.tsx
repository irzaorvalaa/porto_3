import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Avatar, Box, Button, dividerClasses, Stack } from '@mui/material'
import customer from '../../../../assets/data/customer.json'
import './Account.scss'

type Props = {
  openAccount: any
}

const Account = ({ openAccount }: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <div>
      {openAccount ? (
        <div className="account">
          <div className="account__card">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Box>
                  <Typography className="font-bold text-xl">My Account</Typography>
                  <Box className="grid grid-flow-col my-3 mx-3">
                    <Avatar
                      src="'../../../../assets/img/avatar.png"
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box className="mx-5">
                      <Typography className="text-2xl font-bold">{customer?.[0]?.name}</Typography>
                      <Typography className="text-xl">{customer?.[0]?.email}</Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box className="account__card--detail">
                  <Box className="account__card--detail__left">
                    <Typography className="account__card--detail__left--title">
                      Personal Detail
                    </Typography>
                    <Box>
                      <div>
                        <span>Name : </span>
                        <span className="ml-10">{customer?.[0]?.name}</span>
                        <Button>Ubah</Button>
                      </div>
                      <div>
                        <span>Gender : </span>
                        <span className="ml-9"> {customer?.[0]?.gender}</span>
                        <Button>Ubah</Button>
                      </div>
                      <div>
                        <span>Date of Birth : </span>
                        <span className="ml-8">{customer?.[0]?.birthdate}</span>
                        <Button>Ubah</Button>
                      </div>

                      <Button>Change Password</Button>
                    </Box>
                  </Box>
                  <Box className="account__card--detail__right">
                    <Typography className="account__card--detail__right--title">Contact</Typography>
                    <Box>
                      <div>
                        <span>No. Handphone : </span>
                        <span>{customer?.[0]?.phone}</span>
                        <Button>Ubah</Button>
                      </div>
                      <div>
                        <span>Email : </span>
                        <span>{customer?.[0]?.email}</span>
                        <Button>Ubah</Button>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Account
