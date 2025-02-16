import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { HeaderButton } from "../components/Header/HeaderButton";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useRootNavigation } from "../navigations/RootStackNavigation";

export const AddFeedScreen: React.FC<{}> = (props) => {
  const navigation = useRootNavigation<"AddFeed">();
  
  function onPressClose(){
    navigation.goBack();
  }

  return (
    <View style={{flex: 1,}}>
      <Header>
        <HeaderTitle title="ADD-FEED"></HeaderTitle>
        <HeaderButton iconName="close" onPress={onPressClose} color="black" />
      </Header>

      <View>

      </View>
    </View>
  );
};
