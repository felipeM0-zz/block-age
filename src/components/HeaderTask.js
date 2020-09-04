import React, {useEffect, useState} from 'react';
import {TouchableHighlight, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { translate } from '../locales';
// STYLES
import styles from '../styles/HeaderTask';

export default (props) => {
  const [background, setBackground] = useState(props.color);

  useEffect(() => {
    setBackground(props.color);
  }, [props.color]);

  const IconColor = () => {
    const cor = props.color == '#212121' ? '#FFFFFF' : '#212121';
    return cor;
  };

  return (
    <View style={styles.AreaHeader(background)}>
      <TouchableHighlight
        onPress={() => props.Return()}
        underlayColor="rgba(51,51,51,0.1)"
        style={styles.touchIcons}>
        <IconM
          name="close"
          size={27}
          color={IconColor()}
          style={styles.icons}
        />
      </TouchableHighlight>

      <TextInput
        style={styles.InputTitle(IconColor())}
        placeholderTextColor={
          background == '#212121'
            ? 'rgba(255,255,255,0.6)'
            : 'rgba(51,51,51,0.7)'
        }
        placeholder={translate('placetitletask')}
        onChangeText={(e) => props.newTitle(e)}
        value={props.title}
        maxLength={30}
      />

      {props.quant > 0 && (
        <TouchableHighlight
          onPress={() => props.SaveAll()}
          underlayColor="rgba(51,51,51,0.1)"
          style={styles.touchIcons}>
          <Icon
            name="save"
            size={27}
            color={IconColor()}
            style={styles.icons}
          />
        </TouchableHighlight>
      )}

      <TouchableHighlight
        underlayColor="rgba(51,51,51,0.1)"
        style={styles.touchIcons}
        onPress={() => props.showOptions()}>
        <IconM
          name="more-vert"
          size={27}
          style={styles.icons}
          color={IconColor()}
        />
      </TouchableHighlight>
    </View>
  );
};
