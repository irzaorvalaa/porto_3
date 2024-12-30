import * as React from 'react'
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReactQuill from 'react-quill'
import moment from 'moment'
import { FormDataActionType } from '../../../../../interfaces/IFormData'
import isFieldError from '../../../../../utilities/isFieldError'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IProductDDC, IProductDetail, IProductPublisher } from '../../interfaces'
import {
  ALLOWED_IMAGE_TYPE,
  ALLOWED_PDF_TYPE,
  CURRENCY,
  FORMAT_DATE_TEXT,
  MAX_IMAGE_FILESIZE,
  MAX_IMAGE_SIZETEXT,
} from '../../../../../constants/Parameter'
import {
  initialProductFormdata,
  masterCollectionSchema,
  sampleCollectionManagementCourse,
  collectionManagementStatus,
} from './constants'
import {
  IProductFormAuthor,
  IProductFormCourseData,
  IProductFormData,
  IProductFormDetailData,
  IProductFormProps,
} from './interfaces'
import 'react-quill/dist/quill.snow.css'
import './ProductForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import TabPanel from '../../../../../components/tab_panel'
import ProductCourseForm from '../product_course_form'
import ProductDetailForm from '../product_detail_form'
import InputNumberFormat from '../../../../../components/input_number_format'
import { ReactComponent as AddIcon } from '../../../../../assets/svg/icons/add.svg'
import { ReactComponent as EditIcon } from '../../../../../assets/svg/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'
import { ReactComponent as PlusIcon } from '../../../../../assets/svg/icons/outline-plus.svg'
import { invalidMaxSizeFile, invalidMimetypeFile } from '../../../../../constants/ErrorMessage'
import { formats, modules } from '../../../../../constants/QuillEditor'

const ProductForm = ({
  open = false,
  type = 'add',
  collectionTypeOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  onOpen,
  ...other
}: IProductFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [DDCOptions, setDDCOptions] = React.useState<IProductDDC[]>([])
  const [publisherOptions, setPublisherOptions] = React.useState<IProductPublisher[]>([])
  const [supplementOptions, setSupplementOptions] = React.useState<IGeneralFetch[]>([])
  const [subjectOptions, setSubjectOptions] = React.useState<IGeneralFetch[]>([])
  const [campusOptions, setCampusOptions] = React.useState<IGeneralFetch[]>([])
  const [bookTypeOptions, setBookTypeOptions] = React.useState<IGeneralFetch[]>([])
  const [courseData, setCourseData] = React.useState<IProductFormCourseData[]>([])
  const [detailData, setDetailData] = React.useState<IProductFormDetailData[]>([])
  const [selectedCollectionType, setSelectedCollectionType] = React.useState<IGeneralFetch | null>(
    null,
  )
  const [selectedDDC, setSelectedDDC] = React.useState<IProductDDC | null>(null)
  const [selectedPublisher, setSelectedPublisher] = React.useState<IProductPublisher | null>(null)
  const [selectedSupplement, setSelectedSupplement] = React.useState<IGeneralFetch[]>([])
  const [selectedSubject, setSelectedSubject] = React.useState<IGeneralFetch[]>([])
  const [selectedCourse, setSelectedCourse] = React.useState<IProductFormCourseData | null>(null)
  const [selectedCourseIndex, setSelectedCourseIndex] = React.useState<number | null>(null)
  const [selectedDetail, setSelectedDetail] = React.useState<IProductFormDetailData | null>(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = React.useState<number | null>(null)
  const [collection, setCollection] = React.useState<IProductDetail | null>(null)
  const [openCourse, setOpenCourse] = React.useState<boolean>(false)
  const [openDetail, setOpenDetail] = React.useState<boolean>(false)
  const [isFetching, setIsFetching] = React.useState<boolean>(false)
  const [currentTab, setCurrentTab] = React.useState<number>(0)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IProductFormData>({
    defaultValues: initialProductFormdata,
    resolver: yupResolver(masterCollectionSchema),
  })
  const watchPrice = watch('price')
  const watchDescription = watch('description')
  const watchImageFileName = watch('imageFileName')
  const watchAttachedFileName = watch('attachedFileName')

  const {
    fields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({ control, name: 'authorList' })

  const appendAuthor = () => {
    appendField({ name: '' })
  }

  const onEnter = () => {
    setValue('action', defaultValue ? 'Edit' : 'Add')

    if (onOpen) {
      setIsFetching(true)

      onOpen(
        defaultValue ?? null,
        (
          ddc,
          publishers,
          supplements,
          collectionSubjects,
          campuses,
          bookType,
          detailCollection,
        ) => {
          if (ddc) setDDCOptions(ddc)

          if (publishers) setPublisherOptions(publishers)

          if (supplements) setSupplementOptions(supplements)

          if (collectionSubjects) setSubjectOptions(collectionSubjects)

          if (campuses) setCampusOptions(campuses)

          if (bookType) setBookTypeOptions(bookType)

          if (detailCollection && type === 'edit') {
            setCollection(detailCollection)

            setValue('id', detailCollection.id)
            setValue('collectionTypeID', detailCollection.collectionTypeID)
            setValue('collectionType', detailCollection.collectionType)
            setValue('bibli', detailCollection.bibli)
            setValue('title', detailCollection.title)
            setValue('publisherID', detailCollection.publisherAssignation.publisherId)
            setValue('publisherName', detailCollection.publisherAssignation.name)
            setValue('publisherCity', detailCollection.publisherAssignation.city)
            setValue('publishYear', detailCollection.publisherAssignation.publishYear)
            setValue('publicationYear', detailCollection.publisherAssignation.publicationYear)
            setValue('externalID', detailCollection.externalID)
            setValue('keyword', detailCollection.keyword)
            setValue('collation', detailCollection.generalData.collation)
            setValue('isbn', detailCollection.isbn ?? '')
            setValue('price', detailCollection.generalData.price.toString())
            setValue('priceUnit', detailCollection.generalData.priceUnit)
            setValue('description', detailCollection.description)
            setValue(
              'language',
              detailCollection.languageAssignation
                ? (detailCollection.languageAssignation
                    .map((item) => item.languageId)
                    .join(', ') as any)
                : '',
            )
            setValue(
              'languageID',
              detailCollection.languageAssignation
                ? (detailCollection.languageAssignation
                    .map((item) => item.languageId)
                    .join(', ') as any)
                : [],
            )
            setValue(
              'authorName',
              detailCollection.author ? detailCollection.author.map((item) => item.name) : [],
            )
            setValue(
              'authorList',
              detailCollection.author ? detailCollection.author : [{ name: '' }],
            )
            setValue('notes', detailCollection.notes ?? '')

            const findCollectionType = collectionTypeOptions.find(
              (item) => item.id === detailCollection.collectionTypeID,
            )
            setSelectedCollectionType(findCollectionType ?? null)

            const findDDC = DDCOptions.find((item) => item.id === detailCollection.ddc)
            setSelectedDDC(findDDC ?? null)

            const findPublisher = publisherOptions.find(
              (item) => item.id === detailCollection.publisherAssignation.publisherId,
            )
            setSelectedPublisher(findPublisher ?? null)

            setSelectedSubject(
              detailCollection.subject
                ? detailCollection.subject.map((item) => ({
                    id: item.collectionSubjectId,
                    label: item.collectionSubject,
                  }))
                : [],
            )

            const arrCourseData: IProductFormCourseData[] = detailCollection.courseAssignation
              ? detailCollection.courseAssignation.map((item) => ({
                  id: item.courseId,
                  course: item.course,
                  gugusMatkul: item.courseGroup,
                  status: {
                    value: item.status ?? '',
                    label: item.status ?? '',
                  },
                }))
              : []

            setCourseData(arrCourseData)

            const arrDetailData: IProductFormDetailData[] = detailCollection.bookData
              ? detailCollection.bookData.map((item) => ({
                  id: item.campusId,
                  nib: item.nib,
                  campus: {
                    id: item.campusId,
                    label: item.campusName,
                  },
                  dateIn: item.dateIn,
                  bookPhysic: item.bookPhysic,
                  collectionBookType: {
                    id: item.collectionBookTypeID,
                    label: item.collectionBookType,
                  },
                  collectionAquisitionType: item.collectionAquisitionType,
                  mediaType: item.mediaType,
                  condition: item.condition,
                }))
              : []

            setDetailData(arrDetailData)
          }

          setIsFetching(false)
        },
      )
    }

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setCourseData([])
    setDetailData([])
    setSelectedCollectionType(null)
    setSelectedDDC(null)
    setSelectedPublisher(null)
    setSelectedSupplement([])
    setSelectedSubject([])
    setSelectedCourse(null)
    setSelectedCourseIndex(null)
    setSelectedDetail(null)
    setSelectedDetailIndex(null)
    setOpenCourse(false)
    setOpenDetail(false)
    setCurrentTab(0)
    reset(initialProductFormdata)
  }

  const onSubmit = (values: IProductFormData) => {
    const postData: IProductFormData = {
      ...values,
      authorName: values.authorList ? values.authorList.map((item) => item.name) : [],
      collectionSubject: selectedSubject ? selectedSubject.map((item) => item.label) : [],
      collectionSupplement: selectedSupplement ? selectedSupplement.map((item) => item.label) : [],
      courseID: courseData ? courseData.map((item) => item.course) : [],
      course: courseData ? courseData.map((item) => item.course) : [],
      courseGroupID: courseData ? courseData.map((item) => item.gugusMatkul) : [],
      courseGroup: courseData ? courseData.map((item) => item.gugusMatkul) : [],
      courseStatus: courseData ? courseData.map((item) => item.status.value) : [],
      languageID: values.language ? values.language.split(',') : [],
      bookPhysic: detailData ? detailData.map((item) => item.bookPhysic) : [],
      campusID: detailData ? detailData.map((item) => item.campus.id) : [],
      campus: detailData ? detailData.map((item) => item.campus.label) : [],
      collectionAquisitionType: detailData
        ? detailData.map((item) => item.collectionAquisitionType)
        : [],
      collectionBookTypeID: detailData ? detailData.map((item) => item.collectionBookType.id) : [],
      collectionBookType: detailData ? detailData.map((item) => item.collectionBookType.label) : [],
      condition: detailData ? detailData.map((item) => item.condition) : [],
      mediaType: detailData ? detailData.map((item) => item.mediaType) : [],
      nib: detailData ? detailData.map((item) => item.nib) : [],
    }

    if (onConfirm && postData) onConfirm(postData)
  }

  const getTitle = () => {
    const title = 'Master Collection'

    if (type === 'edit') {
      return 'Edit '.concat(title)
    }

    return 'Form '.concat(title)
  }

  const getFieldErrorMessage = (index: number, field: keyof IProductFormAuthor) => {
    if (errors.authorList && errors.authorList[index]) {
      const fieldError = errors.authorList[index]
      if (field === 'name') {
        return fieldError?.name?.message
      }
    }

    return null
  }

  const handleSubmitCourse = (type: FormDataActionType, values: IProductFormCourseData) => {
    if (type === 'Add') {
      setCourseData((prev) => [...prev, values])
    } else {
      const currentCourseData = courseData
      currentCourseData[selectedCourseIndex as number] = values
      setCourseData(currentCourseData)
    }

    setSelectedCourse(null)
    setSelectedCourseIndex(null)
    setOpenCourse(false)
  }

  const handleDeleteCourse = (course: IProductFormCourseData) => {
    setCourseData((prev) => prev.filter((v) => v !== course))
  }

  const handleEditCourse = (index: number, course: IProductFormCourseData) => {
    setSelectedCourse(course)
    setSelectedCourseIndex(index)
    setOpenCourse(true)
  }

  const handleSubmitDetail = (type: FormDataActionType, values: IProductFormDetailData) => {
    if (type === 'Add') {
      setDetailData((prev) => [...prev, values])
    } else {
      const currentDetailData = detailData
      currentDetailData[selectedDetailIndex as number] = values
      setDetailData(currentDetailData)
    }

    setSelectedDetail(null)
    setSelectedDetailIndex(null)
    setOpenDetail(false)
  }

  const handleDeleteDetail = (detail: IProductFormDetailData) => {
    setDetailData((prev) => prev.filter((v) => v !== detail))
  }

  const handleEditDetail = (index: number, detail: IProductFormDetailData) => {
    setSelectedDetail(detail)
    setSelectedDetailIndex(index)
    setOpenDetail(true)
  }

  const handleChangeCollectionType = (value: IGeneralFetch | null) => {
    setSelectedCollectionType(value)
    setValue('collectionType', value ? value.label : '')
  }

  const handleChangeDDC = (value: IProductDDC | null) => {
    setSelectedDDC(value)
    setValue('topic', value ? value.topic : '')
  }

  const handleChangePublisher = (value: IProductPublisher | null) => {
    setSelectedPublisher(value)
    setValue('publisherName', value ? value.name : '')
    setValue('publisherCity', value ? value.city : '')
  }

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]

      if (!ALLOWED_IMAGE_TYPE.includes(file.type)) {
        setValue('imageFIleData', '')

        setError('imageFIleData', { message: invalidMimetypeFile })

        return
      } else {
        clearErrors('imageFIleData')
      }

      if (file.size > MAX_IMAGE_FILESIZE) {
        setValue('imageFIleData', '')

        setError('imageFIleData', {
          message: `${invalidMaxSizeFile}. (Max: ${MAX_IMAGE_SIZETEXT})`,
        })

        return
      } else {
        clearErrors('imageFIleData')
      }

      setValue('imageFileName', file.name)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setValue('imageFIleData', reader.result as string)
      }
    }
  }

  const handleUploadAttachedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]

      if (!ALLOWED_PDF_TYPE.includes(file.type)) {
        setValue('attachedFIleData', '')

        setError('attachedFIleData', { message: invalidMimetypeFile })

        return
      } else {
        clearErrors('attachedFIleData')
      }

      setValue('attachedFileName', file.name)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setValue('attachedFIleData', reader.result as string)
      }
    }
  }

  const isTabGeneralError = React.useMemo(() => {
    const fields = ['keyword', 'price']
    return fields.filter((field) => Object.keys(errors).includes(field)).length > 0
  }, [errors])

  const isTabLanguageError = React.useMemo(() => {
    return Object.keys(errors).includes('language')
  }, [errors])

  const isTabAuthorError = React.useMemo(() => {
    return Object.keys(errors).includes('authorList')
  }, [errors])

  return (
    <DialogForm
      open={open}
      title={getTitle()}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      TransitionProps={{
        onEnter: onEnter,
        onExit: onExit,
      }}
      labelConfirmButton="SAVE"
      labelCancelButton="CANCEL"
      {...other}
    >
      <form>
        <div className="collection-management-form__formwrapper">
          <div>
            <FormControl fullWidth margin="dense">
              <FormLabel className="collection-management__formlabel">Collection Type *</FormLabel>
              <Controller
                control={control}
                name="collectionTypeID"
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    value={selectedCollectionType}
                    options={collectionTypeOptions}
                    onChange={(_, newValue) => {
                      onChange(newValue?.id)
                      handleChangeCollectionType(newValue)
                    }}
                    getOptionLabel={(option) => option.label ?? ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Please select"
                        error={isFieldError(errors, 'collectionTypeID')}
                        helperText={errors.collectionTypeID?.message}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <FormLabel className="collection-management__formlabel">Bibli</FormLabel>
              <TextField
                size="small"
                placeholder="Type here"
                error={isFieldError(errors, 'bibli')}
                helperText={errors.bibli?.message}
                {...register('bibli')}
              />
            </FormControl>
          </div>
          <div className="collection-management-form__wrapperupload">
            <FormControl margin="dense">
              {type === 'edit' && collection && collection.collectionImgUrl && (
                <div className="collection-management-form__image">
                  <img src={collection.collectionImgUrl} />
                </div>
              )}
              <div className="collection-management-form__filename">{watchImageFileName}</div>
              <div className="collection-management-form__upload">
                <Button
                  variant="outlined"
                  component="label"
                  disableElevation
                  className="collection-management-form__buttonupload"
                >
                  <PlusIcon className="collection-management-form__plusicon" />
                  <span>Choose Cover</span>
                  <input
                    hidden
                    accept={ALLOWED_IMAGE_TYPE.join(',')}
                    type="file"
                    onChangeCapture={handleUploadImage}
                  />
                </Button>
              </div>
              {isFieldError(errors, 'imageFileName') && (
                <FormHelperText error={isFieldError(errors, 'imageFileName')}>
                  {errors.imageFileName?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl margin="dense">
              {type === 'edit' && collection && collection.attachedFile && (
                <div className="collection-management-form__attachedfile">
                  <a href={collection.attachedFile} target="_blank" rel="noreferrer">
                    Attached File
                  </a>
                </div>
              )}
              <div className="collection-management-form__filename">{watchAttachedFileName}</div>
              <div className="collection-management-form__upload">
                <Button
                  variant="outlined"
                  component="label"
                  disableElevation
                  className="collection-management-form__buttonupload"
                >
                  <PlusIcon className="collection-management-form__plusicon" />
                  <span>Choose File</span>
                  <input
                    hidden
                    accept={ALLOWED_PDF_TYPE.join(',')}
                    type="file"
                    onChangeCapture={handleUploadAttachedFile}
                  />
                </Button>
              </div>
              {isFieldError(errors, 'attachedFileName') && (
                <FormHelperText error={isFieldError(errors, 'attachedFileName')}>
                  {errors.attachedFileName?.message}
                </FormHelperText>
              )}
            </FormControl>
          </div>
        </div>
        <div className="collection-management-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">DDC</FormLabel>
            <Controller
              control={control}
              name="ddcid"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={selectedDDC}
                  options={DDCOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.id)
                    handleChangeDDC(newValue)
                  }}
                  getOptionLabel={(option) => option.id ?? ''}
                  loading={isFetching}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Please select"
                      error={isFieldError(errors, 'ddcid')}
                      helperText={errors.ddcid?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            {isFetching && <CircularProgress size={24} />}
                            {params.InputProps.endAdornment}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Call ID</FormLabel>
            <div className="collection-management-form__formwrapper">
              <div className="collection-management-form__row">
                <span>1.</span>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'panggil1')}
                  helperText={errors.panggil1?.message}
                  {...register('panggil1')}
                />
              </div>
              <div className="collection-management-form__row">
                <span>2.</span>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'panggil2')}
                  helperText={errors.panggil2?.message}
                  {...register('panggil2')}
                />
              </div>
            </div>
          </FormControl>
        </div>
        <div className="collection-management-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Topic</FormLabel>
            <TextField
              size="small"
              placeholder="Select DDC"
              disabled
              error={isFieldError(errors, 'topic')}
              helperText={errors.topic?.message}
              {...register('topic')}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Edition</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'edition')}
              helperText={errors.edition?.message}
              {...register('edition')}
            />
          </FormControl>
        </div>
        {/* <div className="collection-management-form__formwrapper"> */}
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Title *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'title')}
            helperText={errors.title?.message}
            {...register('title')}
          />
        </FormControl>
        {/* <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Cataloger *</FormLabel>
            <TextField
              size="small"
              error={isFieldError(errors, 'cataloger')}
              helperText={errors.cataloger?.message}
              {...register('cataloger')}
            />
          </FormControl> */}
        {/* </div> */}
        <div className="collection-management-form__tabswrapper">
          <Tabs
            value={currentTab}
            onChange={(_, value) => setCurrentTab(value)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
          >
            <Tab label="Publisher" />
            <Tab
              label="General"
              className={isTabGeneralError ? 'collection-management-form__taberror' : ''}
            />
            <Tab
              label="Language & Geography"
              className={isTabLanguageError ? 'collection-management-form__taberror' : ''}
            />
            <Tab
              label="Author & Notes"
              className={isTabAuthorError ? 'collection-management-form__taberror' : ''}
            />
            <Tab label="Subject" />
            <Tab label="Course" />
            <Tab label="Detail" />
          </Tabs>
          <Divider />
        </div>
        <div className="collection-management-form__tabscontent">
          {/** START: Publisher */}
          <TabPanel value={currentTab} index={0}>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Publisher *</FormLabel>
                <Controller
                  control={control}
                  name="publisherID"
                  render={({ field: { onChange } }) => (
                    <Autocomplete
                      value={selectedPublisher}
                      options={publisherOptions}
                      onChange={(_, newValue) => {
                        onChange(newValue?.id)
                        handleChangePublisher(newValue)
                      }}
                      getOptionLabel={(option) => option.id ?? ''}
                      loading={isFetching}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Please select"
                          error={isFieldError(errors, 'publisherID')}
                          helperText={errors.publisherID?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                {isFetching && <CircularProgress size={24} />}
                                {params.InputProps.endAdornment}
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Publisher Name *</FormLabel>
                <TextField
                  size="small"
                  placeholder="Select Publisher"
                  disabled
                  error={isFieldError(errors, 'publisherName')}
                  helperText={errors.publisherName?.message}
                  {...register('publisherName')}
                />
              </FormControl>
            </div>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Publisher City *</FormLabel>
                <TextField
                  size="small"
                  placeholder="Select Publisher"
                  disabled
                  error={isFieldError(errors, 'publisherCity')}
                  helperText={errors.publisherCity?.message}
                  {...register('publisherCity')}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Publish Year *</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'publishYear')}
                  helperText={errors.publishYear?.message}
                  {...register('publishYear')}
                />
              </FormControl>
            </div>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">
                  Publication Year *
                </FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'publicationYear')}
                  helperText={errors.publicationYear?.message}
                  {...register('publicationYear')}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">
                  External ID (used to map to target ID)
                </FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'externalID')}
                  helperText={errors.externalID?.message}
                  {...register('externalID')}
                />
              </FormControl>
            </div>
          </TabPanel>
          {/** END: Publisher */}

          {/** START: General */}
          <TabPanel value={currentTab} index={1}>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Keyword *</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'keyword')}
                  helperText={errors.keyword?.message}
                  {...register('keyword')}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Collation</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'collation')}
                  helperText={errors.collation?.message}
                  {...register('collation')}
                />
              </FormControl>
            </div>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">ISBN</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'isbn')}
                  helperText={errors.isbn?.message}
                  {...register('isbn')}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Price *</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue="0"
                  fullWidth
                  error={isFieldError(errors, 'price')}
                  helperText={errors.price?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{CURRENCY}</InputAdornment>,
                    inputComponent: InputNumberFormat as any,
                    inputProps: {
                      value: watchPrice,
                    },
                  }}
                  {...register('price')}
                />
              </FormControl>
            </div>
            <FormControl fullWidth margin="dense">
              <FormLabel className="collection-management__formlabel">
                Description/Sysnopsis *
              </FormLabel>
              <div data-text-editor="quill-text-editor">
                <ReactQuill
                  bounds={'[data-text-editor="quill-text-editor"]'}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={watchDescription}
                  onChange={(value) => setValue('description', value)}
                />
              </div>
              {isFieldError(errors, 'description') && (
                <FormHelperText error={isFieldError(errors, 'description')}>
                  {errors.description?.message}
                </FormHelperText>
              )}
            </FormControl>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Supplement</FormLabel>
                <Controller
                  control={control}
                  name="collectionSupplementID"
                  render={({ field: { onChange } }) => (
                    <Autocomplete
                      multiple
                      value={selectedSupplement}
                      options={supplementOptions}
                      onChange={(_, newValue) => {
                        onChange(newValue ? newValue.map((v) => v.id) : [])
                        setSelectedSupplement(newValue)
                      }}
                      getOptionLabel={(option) => option.label ?? ''}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      loading={isFetching}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Please select"
                          error={isFieldError(errors, 'collectionSupplementID')}
                          helperText={errors.collectionSupplementID?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                {isFetching && <CircularProgress size={24} />}
                                {params.InputProps.endAdornment}
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
              <div />
            </div>
          </TabPanel>
          {/** END: General */}

          {/** START: Language & Geographic */}
          <TabPanel value={currentTab} index={2}>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Language *</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'language')}
                  helperText={errors.language?.message}
                  {...register('language')}
                />
              </FormControl>
              <div />
            </div>
          </TabPanel>
          {/** END: Language & Geographic */}

          {/** START: Author & Notes */}
          <TabPanel value={currentTab} index={3}>
            {fields.map((field, index) => (
              <div key={field.id} className="collection-management-form__formwrapper">
                <div className="collection-management-form__fieldauthor">
                  <FormControl fullWidth margin="dense">
                    <FormLabel className="collection-management__formlabel">
                      {index === 0 ? 'Main Author' : 'Author ' + index} *
                    </FormLabel>
                    <TextField
                      size="small"
                      placeholder="Type here"
                      error={isFieldError(errors.authorList, 'name', index)}
                      helperText={getFieldErrorMessage(index, 'name')}
                      {...register(`authorList.${index}.name`)}
                    />
                  </FormControl>
                  {index === 0 ? (
                    <IconButton color="secondary" size="medium" onClick={appendAuthor}>
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <IconButton color="error" size="medium" onClick={() => removeField(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
                <div />
              </div>
            ))}
            <FormControl fullWidth margin="dense">
              <FormLabel className="collection-management__formlabel">Notes</FormLabel>
              <TextField
                multiline
                size="small"
                minRows={3}
                error={isFieldError(errors, 'notes')}
                helperText={errors.notes?.message}
                {...register('notes')}
              />
            </FormControl>
          </TabPanel>
          {/** END: Author & Notes */}

          {/** START: Subject */}
          <TabPanel value={currentTab} index={4}>
            <div className="collection-management-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="collection-management__formlabel">Subject</FormLabel>
                <Controller
                  control={control}
                  name="collectionSubjectID"
                  render={({ field: { onChange } }) => (
                    <Autocomplete
                      multiple
                      value={selectedSubject}
                      options={subjectOptions}
                      onChange={(_, newValue) => {
                        onChange(newValue ? newValue.map((v) => v.id) : [])
                        setSelectedSubject(newValue)
                      }}
                      getOptionLabel={(option) => option.label ?? ''}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      loading={isFetching}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Please select"
                          error={isFieldError(errors, 'collectionSubjectID')}
                          helperText={errors.collectionSubjectID?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                {isFetching && <CircularProgress size={24} />}
                                {params.InputProps.endAdornment}
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
              <div />
            </div>
          </TabPanel>
          {/** END: Subject */}

          {/** START: Course */}
          <TabPanel value={currentTab} index={5}>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              className="button button--secondary collection-management-form__buttonadd"
              onClick={() => setOpenCourse(true)}
            >
              ADD COURSE
            </Button>

            {openCourse && (
              <ProductCourseForm
                defaultValue={selectedCourse}
                courseOptions={sampleCollectionManagementCourse}
                statusOptions={collectionManagementStatus}
                onSubmit={handleSubmitCourse}
                onClose={() => setOpenCourse(false)}
              />
            )}

            <TableContainer
              component={Paper}
              elevation={0}
              className="collection-management-form__table"
            >
              <Table sx={{ minWidth: 700 }}>
                <TableHead className="collection-management-form__thead">
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Field of Study</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center" width={120}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseData.length > 0 ? (
                    courseData.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {course.course}
                        </TableCell>
                        <TableCell>{course.gugusMatkul}</TableCell>
                        <TableCell>{course.status.label}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit" arrow disableInteractive>
                            <IconButton onClick={() => handleEditCourse(index, course)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete" arrow disableInteractive>
                            <IconButton onClick={() => handleDeleteCourse(course)}>
                              <DeleteIcon className="text-button-red" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          {/** END: Course */}

          {/** START: Detail */}
          <TabPanel value={currentTab} index={6}>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              className="button button--secondary collection-management-form__buttonadd"
              onClick={() => setOpenDetail(true)}
            >
              ADD DETAIL
            </Button>

            {openDetail && (
              <ProductDetailForm
                defaultValue={selectedDetail}
                campusOptions={campusOptions}
                bookTypeOptions={bookTypeOptions}
                loading={isFetching}
                onSubmit={handleSubmitDetail}
                onClose={() => setOpenDetail(false)}
              />
            )}

            <TableContainer
              component={Paper}
              elevation={0}
              className="collection-management-form__table"
            >
              <Table sx={{ minWidth: 700 }}>
                <TableHead className="collection-management-form__thead">
                  <TableRow>
                    <TableCell>NIB</TableCell>
                    <TableCell>Campus Location</TableCell>
                    <TableCell>Date In</TableCell>
                    <TableCell>Book Physic</TableCell>
                    <TableCell>Book Type</TableCell>
                    <TableCell>Acquisition Type</TableCell>
                    <TableCell>Media Type</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell align="center" width={120}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailData.length > 0 ? (
                    detailData.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {detail.nib}
                        </TableCell>
                        <TableCell>{detail.campus.label}</TableCell>
                        <TableCell>{moment(detail.dateIn).format(FORMAT_DATE_TEXT)}</TableCell>
                        <TableCell>{detail.bookPhysic}</TableCell>
                        <TableCell>{detail.collectionBookType.label}</TableCell>
                        <TableCell>{detail.collectionAquisitionType}</TableCell>
                        <TableCell>{detail.mediaType}</TableCell>
                        <TableCell>{detail.condition}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit" arrow disableInteractive>
                            <IconButton onClick={() => handleEditDetail(index, detail)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete" arrow disableInteractive>
                            <IconButton onClick={() => handleDeleteDetail(detail)}>
                              <DeleteIcon className="text-button-red" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          {/** END: Detail */}
        </div>
      </form>
    </DialogForm>
  )
}

export default ProductForm
