import * as React from 'react'
import { Divider, Skeleton, Tab, Tabs } from '@mui/material'
import moment from 'moment'
import { ICampus } from '../../../../interfaces/ICampus'
import { FORMAT_DATE_EVENT_HEADLINE, FORMAT_DATE_EVENT_ITEM } from '../../../../constants/Parameter'
import TabPanel from '../../../../components/tab_panel'
import { IHomeNewsEvent, IHomeNewsEventProps } from './interfaces'
import './HomeNewsEvent.scss'
import { NavLink } from 'react-router-dom'

import { ReactComponent as NoData } from '../../../../assets/svg/no-data.svg'

const HomeNewsEvent = ({
  data = [],
  dataCampus = [],
  loading = false,
  loadingCampus = false,
  onChangeCampus,
}: IHomeNewsEventProps) => {
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

  const news = React.useMemo<IHomeNewsEvent[]>(() => data, [data])
  const campusList = React.useMemo<ICampus[]>(() => [allCampus, ...dataCampus], [dataCampus])

  const handleChange = (newValue: number) => {
    setValue(newValue)

    if (onChangeCampus) onChangeCampus(campusList[newValue])
  }

  return (
    <div className="home-news-event">
      <div className="home-news-event__container">
        <div className="home-news-event__title">NEWS AND EVENT</div>
        <div className="home-news-event__tab">
          {loadingCampus ? (
            <Skeleton className="home-news-event__loading home-news-event__loading--tabs" />
          ) : (
            <div className="home-news-event__tabswrapper">
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
            <div>
              <Skeleton className="home-news-event__loading home-news-event__loading--headline" />
              <div className="home-news-event__grid">
                {Array.from({ length: 3 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="home-news-event__loading home-news-event__loading--item"
                  />
                ))}
              </div>
            </div>
          ) : news.length > 0 ? (
            campusList.map((_, index) => (
              <TabPanel
                key={index}
                value={value}
                index={index}
                id={`announcement-tabpanel-${index}`}
              >
                <div className="home-news-event__content">
                  {news.length > 0 && news[0] && (
                    <div className="home-news-event__headline">
                      <div className="home-news-event__headline--overlay">
                        <NavLink
                          to={`/news/${news[0].id}`}
                          className="home-news-event__headline--title"
                        >
                          {news[0].title}
                        </NavLink>
                        <div className="home-news-event__headline--caption">{news[0].caption}</div>
                        <div className="home-news-event__headline--date">
                          {moment(news[0].publishDate).format(FORMAT_DATE_EVENT_HEADLINE)}
                        </div>
                      </div>
                      <span
                        className={
                          news[0].isEvent
                            ? 'home-news-event__headline--event'
                            : 'home-news-event__headline--news'
                        }
                      >
                        {news[0].isEvent ? 'Event' : 'News'}
                      </span>
                      {news[0].newsImgUrl && <img src={news[0].newsImgUrl} alt={news[0].title} />}
                    </div>
                  )}

                  {news.length > 1 && (
                    <div className="home-news-event__grid">
                      {news.map(
                        (item, index) =>
                          index > 0 && (
                            <div key={index} className="home-news-event__item">
                              <img src={item.newsImgUrl || '/images/no-image.png'} alt={item.title} />
                              <div className="home-news-event__item--content">
                                <div className="home-news-event__item--date">
                                  {moment(item.publishDate).format(FORMAT_DATE_EVENT_ITEM)}
                                </div>
                                <NavLink
                                  to={`/news/${item.id}`}
                                  className="home-news-event__item--title"
                                >
                                  {item.title}
                                </NavLink>
                              </div>
                              <span
                                className={
                                  item.isEvent
                                    ? 'home-news-event__item--event'
                                    : 'home-news-event__item--news'
                                }
                              >
                                {item.isEvent ? 'Event' : 'News'}
                              </span>
                            </div>
                          ),
                      )}
                    </div>
                  )}
                </div>
              </TabPanel>
            ))
          ) : (
            <div className="home-news-event__empty">
              <NoData />
              <div className="home-news-event__empty--title">No news or event available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeNewsEvent
