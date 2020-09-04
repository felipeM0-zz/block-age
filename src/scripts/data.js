import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const anno = async () => {
  const keys = await AsyncStorage.getAllKeys();

  let correctsKeys = [];
  let allItems = [];
  let lista = [];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].substr(0, 5) == '@anno') {
      correctsKeys.push(keys[i]);
    }
  }

  if (correctsKeys.length > 0) {
    for (let i = 0; i < correctsKeys.length; i++) {
      const value = await AsyncStorage.getItem(correctsKeys[i]);
      allItems.push(JSON.parse(value));
    }

    for (let i = 0; i < allItems.length; i++) {
      allItems[i].forEach((e) => {
        lista.push({
          conteudo: e.conteudo,
          id: e.id,
          data: moment(new Date(e.data)).format('DD/MM/YY (HH:mm a)'),
          bgc: e.bgc,
        });
      });
    }
  }

  let list = lista;
  return list;
};

const task = async () => {
  const keys = await AsyncStorage.getAllKeys();
  let correctsKeys = [];
  let allItems = [];
  let saveValues = [];
  let saveTasks = [];
  let final = [];
  let lista = [];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].substr(0, 5) == '@list') {
      correctsKeys.push(keys[i]);
    }
  }

  for (let i = 0; i < correctsKeys.length; i++) {
    const value = await AsyncStorage.getItem(correctsKeys[i]);
    allItems.push(JSON.parse(value));
  }

  for (let i = 0; i < allItems.length; i++) {
    allItems[i].forEach((e) => {
      e.items.forEach((v) => {
        saveTasks.push(v.task);
        saveValues = [
          {
            doneAll: e.doneAll,
            title: e.title,
            bgc: e.bgc,
            qnt: saveTasks.length,
            data: e.data,
            id: e.id,
            tasks: saveTasks.join(', '),
          },
        ];
      });
      saveTasks = [];
    });
    final.push(saveValues);
    saveValues = [];
  }

  for (let i = 0; i < final.length; i++) {
    final[i].forEach((e) => {
      lista.push({
        id: e.id,
        doneAll: e.doneAll,
        title: e.title,
        tasks: e.tasks,
        bgc: e.bgc,
        data: e.data,
        qnt: e.qnt,
      });
    });
  }

  let list = lista;
  return list;
};

export {anno, task};
