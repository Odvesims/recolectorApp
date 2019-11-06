import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Badge} from 'native-base';

const withBadge = (value, options = {}) => WrappedComponent =>
  class extends Component {
    render() {
      const {
        top = -5,
        right = 0,
        left = 0,
        bottom = 0,
        hidden = !value,
        ...badgeProps
      } = options;
      const badgeValue =
        typeof value === 'function' ? value(this.props) : value;
      return (
        <View>
          <WrappedComponent {...this.props} />
          {!hidden && (
            <Badge
              success
              value={badgeValue}
              containerStyle={[
                styles.badgeContainer,
                {top, right, left, bottom},
              ]}
              {...badgeProps}
            />
          )}
        </View>
      );
    }
  };

export default withBadge;

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
  },
});
