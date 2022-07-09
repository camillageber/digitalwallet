const cambio = (coin) => {
  const coins = {
    USD: 'Dólar Comercial',
    CAD: 'Dólar canadense',
    GBP: 'Libra esterlina',
    ARS: 'Peso argentino',
    BTC: 'Bitcoin',
    LTC: 'Litecoin',
    EUR: 'Euro',
    JPY: 'Iene japonês',
    CHF: 'Franco suíço',
    AUD: 'Dólar australiano',
    CNY: 'Remimbi',
    ILS: 'Novo shekel israelense',
    ETH: 'Ethereum',
    XRP: 'Ripple',
    DOGE: 'Dogecoin',
  };

  return coins[coin];
};

export default cambio;

// Auxílio nos requisitos 6, 7 e 8 do colega Carlos Daniel na sala de estudos.
// Esse documento serve para auxiliar a construção do map de moedas no componente TableExpenses.js.
