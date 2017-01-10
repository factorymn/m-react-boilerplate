import { colors } from 'material-ui/styles';
import { fade }   from 'material-ui/utils/colorManipulator';
import Spacing    from 'material-ui/styles/spacing';

module.exports = {
  spacing: Spacing,
  fontFamily: 'system, -apple-system, Roboto, Helvetica, Arial, sans-serif',
  palette: {
    primary1Color: colors.blueA200,
    primary2Color: colors.cyan700,
    primary3Color: colors.lightBlack,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3)
  },
  datePicker: {
    selectColor: colors.blueA200
  }
};
