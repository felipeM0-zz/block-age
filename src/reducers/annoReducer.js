const initialState = {
  status: true,
  anno: 0,
  task: 0,
  cor: '#474747',

  primary: '#212121',
  padrao: '#ffd700',
  position: 2,

  add: false,
  check: false,
  quality: 0.8,
  fonte: 17,
  init: true,
  keyboard: 'n',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return {...state, status: action.payload.status};
      break;
    case 'SET_ANNO':
      return {...state, anno: action.payload.anno};
      break;
    case 'SET_TASK':
      return {...state, task: action.payload.task};
      break;
    case 'SET_COR':
      return {...state, cor: action.payload.cor};
      break;

    case 'SET_PRIMARY':
      return {...state, primary: action.payload.primary};
      break;
    case 'SET_PADRAO':
      return {...state, padrao: action.payload.padrao};
      break;
    case 'SET_POSITION':
      return {...state, position: action.payload.position};
      break;
    case 'SET_ADD':
      return {...state, add: action.payload.add};
      break;
    case 'SET_CHECK':
      return {...state, check: action.payload.check};
      break;
    case 'SET_QUALITY':
      return {...state, quality: action.payload.quality};
      break;
    case 'SET_FONTE':
      return {...state, fonte: action.payload.fonte};
      break;
    case 'SET_INIT':
      return {...state, init: action.payload.init};
      break;
    case 'SET_KEYBOARD':
      return {...state, keyboard: action.payload.keyboard};
      break;
  }

  return state;
};
