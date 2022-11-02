import {environment} from '../../../environments/environment';

export const ApiConstant = {
  staff: `${environment.service.localhost}/api/v1/staff`,
  category: `${environment.service.localhost}/api/v1/category`,
  brand: `${environment.service.localhost}/api/v1/brand`,
  productDetail: `${environment.service.localhost}/api/v1/productDetail`,
  product: `${environment.service.localhost}/api/v1/product`,
  origin: `${environment.service.localhost}/api/v1/origin`,
  material: `${environment.service.localhost}/api/v1/material`,
  uploadImage: `${environment.service.localhost}/api/v1/upload/images`,
  customer: `${environment.service.localhost}/api/v1/customer`,
  image: `${environment.service.localhost}/api/v1/image`,
  sendMail: `${environment.service.localhost}/api/v1/sendMail`,
  sendMailWithAttachment: `${environment.service.localhost}/api/v1/sendMailWithAttachment`,
  promotional : `${environment.service.localhost}/api/v1/promotional`,
  promotionalProduct : `${environment.service.localhost}/api/v1/product-promotional`,
  voucher: `${environment.service.localhost}/api/v1/voucher`,
  auth: `${environment.service.localhost}/api/auth`,
  order: `${environment.service.localhost}/api/v1/order`,
  orderDetail: `${environment.service.localhost}/api/v1/order-detail`,
  cart: `${environment.service.localhost}/api/v1/cart`,
}

