import React, {Component} from 'react';
import {} from 'react-native-vector-icons';
import {theme} from '../../../constants';
import {AddButton, SearchBar, FetchingData} from '../../../components';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// import ContentCustom from '../components';

import {
  Icon,
  Button,
  Content,
  Item,
  ActionSheet,
  Container,
  Root,
} from 'native-base';

export class Defeated extends Component {
  state = {
    show: true,
    BUTTONS: [
      {
        text: global.translate('TITLE_VIEW'),
        icon: 'eye',
        iconColor: theme.colors.primary,
      },
      {
        text: global.translate('TITLE_CANCEL'),
        icon: 'close',
        iconColor: theme.colors.gray,
      },
    ],
    DESTRUCTIVE_INDEX: 3,
    CANCEL_INDEX: 4,
  };
  render() {
    const {tab_data} = this.props;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    return (
      <Root>
        <Container>
<<<<<<< HEAD
          <Content style={styles.content}>
            <ScrollView>
=======
          <ScrollView>
            <Content style={styles.content}>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
              <FlatList
                style={{overflow: 'hidden'}}
                data={tab_data}
                renderItem={({item}) => (
                  <Item style={styles.list}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 12,
                      }}>
                      <View key={item.key} style={styles.listContainer}>
                        <Text style={styles.name}>{item.description}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.address}>
                            {global.translate('TITLE_COLLECTOR')}:{' '}
                            {item.employee_name}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Button
                      transparent
                      style={styles.more}
                      onPress={() =>
                        ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: global.translate('TITLE_OPTIONS'),
                          },
                          buttonIndex => {
                            switch (buttonIndex) {
                              case 0:
                                this.props.navigation.navigate('Route', {
                                  operation: 'TITLE_VIEW_ROUTE',
                                  route_id: item.route_id,
                                  description: item.description,
                                  document_id: item.document_id,
                                  document_acronym: item.acronym,
                                  document_number: item.document_number,
                                  assigned_by: item.assigned_by,
                                  assigned_to: item.assigned_to,
                                  supervisor_name: item.supervisor_name,
                                  employee_name: item.employee_name,
                                  phone_number: item.phone_number,
                                  date_from: item.date_from,
                                  date_to: item.date_to,
                                  status: item.status,
                                  disabled_date_from: true,
                                  loading_message: 'MESSAGE_UPDATING_ROUTE',
                                  new_record: false,
                                  details: item.details,
                                });
                                break;
                              case 1:
                                ActionSheet.hide();
                                break;
                            }
                          },
                        )
                      }>
                      <Icon style={{color: 'gray'}} name="more" />
                    </Button>
                  </Item>
                )}
              />
<<<<<<< HEAD
            </ScrollView>
          </Content>

          {/* Content */}
=======
            </Content>

            {/* Content */}
          </ScrollView>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
        </Container>
      </Root>
    );
  }
}

export default Defeated;

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
  list: {
    margin: 5,
    backgroundColor: 'white',
    height: 80,
    paddingLeft: 12,
    elevation: 1,
  },
  content: {
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
    flex: 1,
  },
  code: {
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
  },

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    elevation: 8,
  },

  more: {
    position: 'absolute',
    right: 0,
  },
});
