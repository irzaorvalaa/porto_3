import * as React from 'react'
import { Divider, Skeleton, Tab, Tabs } from '@mui/material'
import { ICampus } from '../../../../interfaces/ICampus'
import TabPanel from '../../../../components/tab_panel'
import { IHomeAnnouncement, IHomeAnnouncementProps } from './interfaces'
import { ReactComponent as NoData } from '../../../../assets/svg/no-data.svg'
import './HomeAnnouncement.scss'
import { NavLink } from 'react-router-dom'

const HomeAnnouncement = ({
  data = [],
  dataCampus = [],
  loading = false,
  loadingCampus = false,
  onChangeCampus,
}: IHomeAnnouncementProps) => {
  const allCampus = React.useMemo<ICampus>(
    () => ({
      id: '',
      name: 'All Campus',
      email: '',
      address: '',
      campusImgUrl: '',
      serviceHour: [],
    }),
    [],
  )

  // State
  const [value, setValue] = React.useState<number>(0)

  const announcements = React.useMemo<IHomeAnnouncement[]>(() => data, [data])
  const campusList = React.useMemo<ICampus[]>(() => [allCampus, ...dataCampus], [dataCampus])

  const handleChange = (newValue: number) => {
    setValue(newValue)

    if (onChangeCampus) onChangeCampus(campusList[newValue])
  }

  return (
    <div className="home-announcement">
      <div className="home-announcement__container">
        <div className="home-announcement__title">ANNOUNCEMENT</div>
        <div className="home-announcement__tab">
          <div>
            {loadingCampus ? (
              <Skeleton height={40} />
            ) : (
              <div className="home-announcement__tabswrapper">
                <Tabs
                  variant="scrollable"
                  textColor="inherit"
                  value={value}
                  onChange={(_, newValue) => handleChange(newValue)}
                >
                  {campusList.map((campus, index) => (
                    <Tab key={index} label={campus.name} />
                  ))}
                </Tabs>
                <Divider />
              </div>
            )}

            {loading ? (
              <Skeleton height={248} className="home-announcement__loading" />
            ) : (
              campusList.map((_, index) => (
                <TabPanel
                  key={index}
                  value={value}
                  index={index}
                  id={`announcement-tabpanel-${index}`}
                >
                  <div className="home-announcement__content">
                    {announcements.length > 0 ? (
                      announcements.map((announcement, index) => (
                        <NavLink key={index} to={`/announcement/${announcement.id}`}>
                          <div
                            key={index}
                            className="home-announcement__item"
                            style={{ backgroundImage: `url(${announcement.announcementImgUrl})` }}
                          >
                            <div className="home-announcement__item--title">
                              {announcement.title}
                            </div>
                          </div>
                        </NavLink>
                      ))
                    ) : (
                      <div className="home-announcement__empty">
                        <NoData />
                        <div className="home-announcement__empty--title">
                          No announcement available
                        </div>
                      </div>
                    )}
                  </div>
                </TabPanel>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeAnnouncement
