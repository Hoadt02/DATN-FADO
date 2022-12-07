export class Constants {

  public static TYPE_DIALOG = {
    NEW: 'new',
    UPDATE: 'update'
  }

  public static TYPE_UPDATE_NUMBER_PRD = {
    PLUS: 'plus',
    MINUS: 'minus',
    INPUT: 'input',
  };

  public static RESULT_CLOSE_DIALOG = {
    CLOSE: 'close',
    SUCCESS: 'success',
    CONFIRM: 'confirm',
    ACTIVE: 'active',
    NOT_ACTIVE: 'not_active'
  }

  public static TYPE_AUTH = {
    SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
    ADMIN: 'ROLE_ADMIN'
  }

  public static RESULT_CLOSE_DIALOG_ORDER = {
    // Xác nhận đơn hàng
    CANCEL: 'cancel',
    CONFIRM: 'confirm',
    //Bắt đầu giao
    START_DELIVERY: 'startDelivery',
    //Đã nhận hàng
    DONE: 'done',
    //Từ chối nhận
    REVERT: 'revert',
  };

  public static STATUS_PAYMENT = {
    SUCCESS: 3,
    CANCEL: 4
  }
  public static PATH_SAVE_IMAGE = {
    FE: 'FE\\src\\assets\\img\\',
    FADO: 'fado-shop\\src\\assets\\img\\',
  }
}
