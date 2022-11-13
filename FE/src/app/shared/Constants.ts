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
    // Huỷ đơn
    Cancel: 'cancel',
    //Mua lại
    Repurchase: 'repurchase',
    //Đã nhận hàng
    HasReceivedTheGoods: 'hasReceivedTheGoods',
  };
}
