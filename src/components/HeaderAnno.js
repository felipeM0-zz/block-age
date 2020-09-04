import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
// STYLES
import styles from '../styles/HeaderAnno';

export default (props) => {
  const returnColor = () => {
    let corInv = props.labelTxt == '#212121' ? '#FFFFFF' : '#212121';
    return corInv;
  };

  return (
    <View style={styles.AreaHeader}>
      <TouchableHighlight
        underlayColor="rgba(51,51,51,0.1)"
        style={styles.touchIcons}
        onPress={() => props.ReturnClear()}>
        <IconMat
          name="close"
          size={27}
          style={styles.iconsConfig}
          color={returnColor()}
        />
      </TouchableHighlight>

      <View style={styles.vwRightIcons}>
        {props.qnt > 0 && (
          <TouchableHighlight
            underlayColor="rgba(51,51,51,0.1)"
            style={styles.touchIcons}
            onPress={() => props.saveAll()}>
            <IconFont
              name="save"
              size={27}
              style={styles.iconsConfig}
              color={returnColor()}
            />
          </TouchableHighlight>
        )}
        <TouchableHighlight
          underlayColor="rgba(51,51,51,0.1)"
          style={styles.touchIcons}
          onPress={() => props.showOptions()}>
          <IconMat
            name="more-vert"
            size={27}
            style={styles.iconsConfig}
            color={returnColor()}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};
