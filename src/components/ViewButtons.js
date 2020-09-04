import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {translate} from '../locales/';
// STYLES
import styles from '../styles/ViewButtons';

export default (props) => {
  return (
    <>
      <View style={styles.AreaButtons}>
        {props.listLength > 0 && (
          <>
            <IconM
              onPress={() => props.clearAll()}
              name="clear-all"
              size={27}
              style={styles.icons(props)}
            />

            <IconM
              onPress={() => props.switchList()}
              name={props.altern ? 'radio-button-checked' : 'all-out'}
              size={27}
              style={styles.icons(props)}
            />
          </>
        )}

        {props.listLength < 100 && (
          <Icon
            onPress={() => props.New()}
            name="plus"
            size={27}
            style={styles.icons(props)}
          />
        )}
      </View>

      <View style={[styles.AreaLabelButtons, styles.AreaButtons]}>
        <>
          {props.listLength > 0 && (
            <>
              <Text style={styles.TxtButton}>
                {translate('txtbuttonclear')}
              </Text>
              <Text style={styles.TxtButton}>
                {props.altern
                  ? translate('txtbuttonselectall')
                  : translate('txtbuttonunselectall')}
              </Text>
            </>
          )}
          {props.listLength < 100 && (
            <Text style={styles.TxtButton}>{translate('txtnewtask')}</Text>
          )}
        </>
      </View>
    </>
  );
};
