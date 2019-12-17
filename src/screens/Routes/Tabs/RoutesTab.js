import React, {Component} from 'react';
import {theme} from '../../../constants';
import {styles} from '../styles';

import {ScrollView, FlatList} from 'react-native';
import {RouteList} from '../../../components';

import {Content, ActionSheet, Root} from 'native-base';

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

  renderHandler = ({item}) => {
    return (
      <RouteList
        item={item}
        label={'TITLE_COLLECTOR'}
        onPress={() => {
          const {BUTTONS, CANCEL_INDEX, DESTRUCTIVE_INDEX} = this.state;
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
          );
        }}
      />
    );
  };

  render() {
    console.log('tab-data==>', this.props.tab_data);
    return (
      <Root>
        <Content style={styles.content}>
          <ScrollView>
            <FlatList
              style={{overflow: 'hidden'}}
              data={this.props.tab_data}
              renderItem={this.renderHandler}
              keyExtractor={item => item.route_id.toString()}
            />
          </ScrollView>
        </Content>
      </Root>
    );
  }
}

export default Defeated;
