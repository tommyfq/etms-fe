
import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100' >
      <style>
        {
          `
          .overlay-image-bg {
            position: fixed; /* Ensures the image stays in the same place even when scrolling */
            top: 0;
            left: 0;
            width: 50vw; /* Full width of the viewport */
            height: 100vh; /* Full height of the viewport */
            z-index: 9999; /* Puts the image on top of everything */
            object-fit: cover; /* Ensures the image scales nicely to cover the area */
            pointer-events: none; /* Allows interactions with the content underneath */
          }
          `
        }
      </style>
      
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        <img
          src={toAbsoluteUrl('media/misc/auth-background2.png')}
          alt="Overlay"
          className="overlay-image-bg"
        />
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        <div className='d-flex flex-center flex-wrap px-5'>
          {/* begin::Links */}
          {/* <div className='d-flex fw-semibold text-primary fs-base'>
            <a href='#' className='px-5' target='_blank'>
              Terms
            </a>

            <a href='#' className='px-5' target='_blank'>
              Plans
            </a>

            <a href='#' className='px-5' target='_blank'>
              Contact Us
            </a>
          </div> */}
          {/* end::Links */}
        </div>
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{backgroundImage: `url(${toAbsoluteUrl('media/misc/auth-content2.png')})`}}
      >
        {/* begin::Content */}
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          {/* begin::Logo */}
          {/* <Link to='/' className='mb-12'>
            <img alt='Logo' src={toAbsoluteUrl('media/logos/epsindo-logo2.png')} className='h-75px' />
          </Link> */}
          
          {/* end::Logo */}

          {/* begin::Image */}
          {/* <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('media/misc/auth-content.png')}
            alt=''
          /> */}
          {/* end::Image */}

          {/* begin::Title */}
          {/* <h1 className='text-white fs-2qx fw-bolder text-center mb-7'>
            Asset Service and Support Portal
          </h1> */}
          {/* end::Title */}

          {/* begin::Text */}
          {/* <div className='text-white fs-base text-center'>
            In this kind of post,{' '}
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the blogger
            </a>
            introduces a person they’ve interviewed <br /> and provides some background information
            about
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the interviewee
            </a>
            and their <br /> work following this is a transcript of the interview.
          </div> */}
          {/* <div className="text-white fs-base text-center">
            This platform is designed to streamline your asset management process, <br/> offering easy access to helpdesk support, service requests, and maintenance tracking for all your assets. <br/> If you encounter any issues, please contact our office number.
          </div> */}
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
