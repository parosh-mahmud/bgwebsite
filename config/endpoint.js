export const PATH = "api";

export const ENDPOINT = {
  auth: {
    superAdminLogin: "/sup-admin/admin-login/",
    resetPassword: "reset-password/",
  },
  dashboard: {
    dashboardInfo: "/sup-admin/dashboard-info/",
    dashboardChart: "/api/sup-admin/dashboard-chart/",
  },
  user: {
    allUser: "/sup-admin/users-all/",
    userDetails: "/user/user_details/",
    userAddBalance: "/api/sup-admin/add-bgcoin/",
    userSubBalance: "/api/sup-admin/sub-bgcoin/",
    userBlock: "/api/sup-admin/block-user/",
    userBlockList: "/api/sup-admin/users-block-all/",
    emailUnverified: "/sup-admin/email-unverified-all/",
    updateUser: "/api/sup-admin/user-update/",
    updateProfile: "/user/update-me/",
  },
  agent: { allAgent: "/sup-admin/agents-all/" },
  reseller: {
    allReseller: "/sup-admin/reseller-all/",
    createReseller: "/reseller/create-reseller/",
    coinList: "/reseller/reseller-coin-req-list/",
    coinDetails: "/reseller/get_res_req_details/?id=",
    approveDetails: "/reseller/acc_status/?id=",
    rejectDetails: "/reseller/rej_status/?id=",
  },
  host: {
    createHost: "/sup-admin/active-host/",
    deActiveHost: "/sup-admin/de-active-host/",
  },
  ticket: {
    getTicket: "/lottery/get-all/",
    getDetailTicket: "/lottery/details/?LotteryId=",
    createTicket: "/lottery/create/",
    updateTicket: "/lottery/edit/?LotteryId=",
    activeTicket: "/sup-admin/active-ticket/",
    deActiveTicket: "/lottery/delete/?LotteryId=",
    drawLottery: "/lottery/draw-lottery/?LotteryId=",
    soldLottery: "/lottery/all-tickets/?LotteryId=",
    drawLotteryWinners: "/lottery/draw-lottery-winners/?LotteryId=",
  },
  slider: {
    addSlider: "/api/slider/add-new-slider/",
    getSlider: "/api/slider/list-slider/",
    getSliderDetails: "/api/slider/details-slider/?id=",
    updateSlider: "/api/slider/update-slider/",
    deleteSlider: "/api/slider/delete/",
  },
  request: {
    request: "/reseller/get-topup-history/",
  },
  wallet: {
    getWallet: "/wallet_app/my-wallet/",
    createCrypto: "/wallet_app/my-crypto-bank/",
    getCrypto: "/wallet_app/wallet-crypto/",
    deleteCrypto: "/wallet_app/wallet-crypto/",
    createBank: "/wallet_app/my-big-bank/",
    getBank: "/wallet_app/wallet-bank/",
    deleteBank: "/wallet_app/wallet-bank/",
    createMobileBank: "/wallet_app/my-mobile-bank/",
    getMobileBank: "/wallet_app/wallet-number/",
    deleteMobileBank: "/wallet_app/wallet-number/",
  },
  withdraw: {
    mobileWithdraw: "/wallet_app/withdrawal-req-list/MobileBank/",
    mobileWithdrawStatus: "/wallet_app/withdrawal-req/",
    bankWithdraw: "/wallet_app/withdrawal-req-list/Bank/",
    cryptoWithdraw: "/wallet_app/withdrawal-req-list/Crypto/",
  },
  logout: {
    userLogout: "/lottery/logout/",
  },
};
