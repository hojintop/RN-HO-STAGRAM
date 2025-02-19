import { useWindowDimensions, View } from "react-native";
import { Header } from "../components/Header/Header";
import { HeaderButton } from "../components/Header/HeaderButton";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useRootNavigation } from "../navigations/RootStackNavigation";
import { Button } from "../components/Button";
import { Icons } from "../components/Icons";
import { MultiLineInput } from "../components/MultiLineInput";
import { useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { RemoteImage } from "../components/RemoteImage";
import Typography from "../components/Typography";
import { Spacer } from "../components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { createFeed, TypeFeedListDispatch } from "../actions/feed";

export const AddFeedScreen: React.FC<{}> = (props) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<TypeFeedListDispatch>()

  const [content, setContent] = useState("");
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);

  const navigation = useRootNavigation<"AddFeed">();

  function onPressClose() {
    navigation.goBack();
  }

  async function onPressAddFeed() {
    if(!canSave){
      alert('사진과 내용을 입력해 주세요');
      return;
    }

    await dispatch(createFeed({
      content : content,
      imageUrl : selectedPhotoUrl ?? "",
    }))

    navigation.goBack();
  }

  const canSave = useMemo(() => {
    if (selectedPhotoUrl === null) return false;
    if (content === "") return false;
    return true;
  }, [selectedPhotoUrl, content]);

  async function onPressPickImage() {
    try {
      const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 1,
      });

      if (imagePickerResult.canceled) return;

      setSelectedPhotoUrl(imagePickerResult.assets[0].uri);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderTitle title="ADD-FEED"></HeaderTitle>
        <HeaderButton iconName="close" onPress={onPressClose} color="black" />
      </Header>

      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Button onPress={onPressPickImage}>
            <View
              style={{
                width: 130,
                height: 130,
                backgroundColor: "lightgray",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              {selectedPhotoUrl !== null ? (
                <RemoteImage
                  url={selectedPhotoUrl}
                  width={130}
                  height={130}
                  style={{ borderRadius: 10 }}
                />
              ) : (
                <Icons name="add" size={40} color="black"></Icons>
              )}
            </View>
          </Button>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <MultiLineInput
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력해 주세요"
              onSubmitEditing={function (): void {
                throw new Error("Function not implemented.");
              }}
              height={110}
              fontSize={17}
            />
          </View>
        </View>
      </View>

      <Button onPress={onPressAddFeed}>
        <View
          style={{
            justifyContent: "flex-end",
            width: width,
            height: 100,
            backgroundColor: canSave ? "black" : "lightgray",
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Typography fontSize={25} color={canSave ? "white" : "gray"}>
              등록하기
            </Typography>
          </View>
          <Spacer space={insets.bottom} />
        </View>
      </Button>
    </View>
  );
};
