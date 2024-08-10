import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Slider, CheckBox} from 'react-native-elements';
import {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const App = () => {
  const [length, setLength] = useState<number>(5);
  const [selectUppercase, setSelectUppercase] = useState<boolean>(false);
  const [selectLowercase, setSelectLowercase] = useState<boolean>(false);
  const [selectNumber, setSelectnumber] = useState<boolean>(false);
  const [selectSymbols, setSelectSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<string>('weak');

  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+{}|:<>?';

  const copyToClipboard = () => {
    ToastAndroid.showWithGravity(
      'Text Copied To Clipboard! 👍',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
    Clipboard.setString(password);
  };

  const submitHandler = () => {
    let characters = '';
    if (selectUppercase) {
      characters += uppercaseLetters;
    }
    if (selectLowercase) {
      characters += lowercaseLetters;
    }
    if (selectNumber) {
      characters += numbers;
    }
    if (selectSymbols) {
      characters += symbols;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    checkPasswordStrength();
    setPassword(password);
  };

  const checkPasswordStrength = () => {
    if (
      !selectLowercase ||
      !selectNumber ||
      !selectUppercase ||
      !selectSymbols
    ) {
      setPasswordStrength('weak');
    }
    if (
      (length > 0 && length < 4 && selectLowercase) ||
      selectUppercase ||
      selectSymbols ||
      selectNumber
    ) {
      setPasswordStrength('weak');
    }
    if (
      (length > 4 && length < 8) ||
      (selectLowercase && selectUppercase) ||
      (selectSymbols && selectNumber)
    ) {
      setPasswordStrength('medium');
    }
    if (
      length > 8 &&
      length < 11 &&
      selectLowercase &&
      selectNumber &&
      selectSymbols &&
      selectUppercase
    ) {
      setPasswordStrength('strong');
    }
  };

  const handleChange = (e: any) => {
    setLength(e);
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInputField}
          placeholder="Generate Password"
          placeholderTextColor={'#ffffff'}
          readOnly={true}
          value={password}
        />
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyIcon}>
          <Icon name="copy1" color={'#ffffff'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.characterLengthBox}>
          <Text style={styles.characterLengthText}>Character Length</Text>
          <Text style={styles.characterLengthText}>{length}</Text>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={length}
          onValueChange={handleChange}
          allowTouchTrack={true}
          thumbTouchSize={{width: 40, height: 40}}
          minimumTrackTintColor="#A5FAB2"
          maximumTrackTintColor="#ffffff"
          thumbTintColor="#ffffff"
        />
        <View>
          <CheckBox
            title="Include Uppercase Letters"
            checkedIcon={<Icon name="check" color={'#A5FAB2'} size={30} />}
            onPress={() => setSelectUppercase(prev => !prev)}
            checked={selectUppercase}
            containerStyle={{
              backgroundColor: 'transparant',
              borderWidth: 0,
            }}
            textStyle={{color: '#ffffff', letterSpacing: 1.5}}
          />
          <CheckBox
            title="Include Lowercase Letters"
            checkedIcon={<Icon name="check" color={'#A5FAB2'} size={30} />}
            onPress={() => setSelectLowercase(prev => !prev)}
            checked={selectLowercase}
            containerStyle={{
              backgroundColor: 'transparant',
              borderWidth: 0,
            }}
            textStyle={{color: '#ffffff', letterSpacing: 1.5}}
          />
          <CheckBox
            title="Include Numbers"
            checkedIcon={<Icon name="check" color={'#A5FAB2'} size={30} />}
            onPress={() => setSelectnumber(prev => !prev)}
            checked={selectNumber}
            containerStyle={{
              backgroundColor: 'transparant',
              borderWidth: 0,
            }}
            textStyle={{color: '#ffffff', letterSpacing: 1.5}}
          />
          <CheckBox
            title="Include Symbols"
            checkedIcon={<Icon name="check" color={'#A5FAB2'} size={30} />}
            onPress={() => setSelectSymbols(prev => !prev)}
            checked={selectSymbols}
            containerStyle={{
              backgroundColor: 'transparant',
              borderWidth: 0,
            }}
            textStyle={{color: '#ffffff', letterSpacing: 1.5}}
          />
        </View>
        <View style={styles.strengthContainer}>
          <Text style={styles.strengthText}>Strength</Text>
          {passwordStrength === 'weak' && (
            <Text style={styles.passwordStrengthText}>Weak</Text>
          )}
          {passwordStrength === 'medium' && (
            <Text style={styles.passwordStrengthText}>Medium</Text>
          )}
          {passwordStrength === 'strong' && (
            <Text style={styles.passwordStrengthText}>Strong</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => submitHandler()}>
          <Text style={styles.buttonText}>
            Generate <Icon name="arrowright" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    height: '100%',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  textInputField: {
    color: '#ffffff',
    fontSize: 20,
    backgroundColor: '#31363F',
    position: 'relative',
  },
  copyIcon: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  characterLengthBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  characterLengthText: {
    color: '#ffffff',
    fontSize: 20,
  },
  mainContainer: {
    marginTop: 40,
    backgroundColor: '#31363F',
    padding: 10,
  },
  generateButton: {
    backgroundColor: '#A5FAB2',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  strengthContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#222831',
    padding: 10,
  },
  strengthText: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  passwordStrengthText: {
    fontSize: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
