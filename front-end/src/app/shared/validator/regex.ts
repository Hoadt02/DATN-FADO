export const Regex = {
  //viết tiếng việt, ko đc viết số, ký tự
  name: '^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
  //không được chứa khoảng trắng, viết dấu và ký tự đặc biệt
  username: '^[a-z0-9A-Z]+(([\',.-][a-zA-Z ])?[a-zA-Z]*)*$',
  //không được viết dấu và không chứa khoảng trắng
  password: '^[a-zA-Z0-9_`~!@#$%^&*()-+={};:\'"<>,?|]+([a-zA-Z0-9_]+)*$',
  //định dạng phoneNumber
  phoneNumber: '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$',
  //định dạng email
  email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
}
