import React from 'react';
import {Modal, TouchableHighlight, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {translate} from '../locales';
// STYLES
import styles from '../styles/MdlColor';

export default (props) => {
  return (
    <Modal
      visible={props.activ}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => props.closeModal(false)}>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="none"
        onPress={() => props.closeModal(false)}
        style={styles.modal}>
        <>
          <View style={styles.modalBody}>
            <TouchableHighlight
              onPress={() => {}}
              underlayColor="none"
              style={styles.lastBox}>
              <>
                <Text style={styles.txtCorFundo}>
                  {translate('txtheadermdlcolor')}
                </Text>
                <View style={styles.vwBoxColor}>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#ffd700')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#ffd700')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#ffd700' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#11ad74')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#11ad74')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#11ad74' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#1d8f91')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#1d8f91')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#1d8f91' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#f5621d')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#f5621d')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#f5621d' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#8f8d8d')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#8f8d8d')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#8f8d8d' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.vwBoxColor}>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#884ec2')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#884ec2')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#884ec2' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#f255f2')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#f255f2')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#f255f2' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#597694')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#597694')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#597694' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#41a827')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#41a827')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#41a827' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#98bd4a')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#98bd4a')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#98bd4a' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.vwBoxColor}>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#4fc3e3')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#4fc3e3')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#4fc3e3' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#007dff')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#007dff')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#007dff' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#fc4e4e')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#fc4e4e')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#fc4e4e' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#FFFFFF')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#FFFFFF')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#FFFFFF' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                  <View style={styles.vwBtnSelect}>
                    <TouchableHighlight
                      style={styles.ButtonColor('#212121')}
                      underlayColor="none"
                      onPress={() => props.bgColor('#212121')}>
                      <></>
                    </TouchableHighlight>
                    {props.bgc == '#212121' && (
                      <View style={styles.BodyIconSelect}>
                        <Icon name="check-circle" size={17} color="#72bd20" />
                      </View>
                    )}
                  </View>
                </View>
                <TouchableHighlight
                  underlayColor="rgba(51,51,51,0.2)"
                  onPress={() => props.closeModal(false)}
                  style={styles.btnClose}>
                  <IconM name="close" size={25} />
                </TouchableHighlight>
              </>
            </TouchableHighlight>
          </View>
        </>
      </TouchableHighlight>
    </Modal>
  );
};
