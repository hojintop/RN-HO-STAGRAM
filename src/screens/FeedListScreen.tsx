import React from "react"
import { Header } from "../components/Header/Header"
import { HeaderTitle } from "../components/Header/HeaderTitle"
import { HeaderButton } from "../components/Header/HeaderButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRootNavigation, useRootRoute } from "../navigations/RootStackNavigation"
import { FlatList, View } from "react-native"
import { FeedInfo } from "../@types/FeedInfo"
import { FeedListItem } from "../components/FeedListItem"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const FeedListScreen:React.FC<{}> = (props)=>{
    const navigation = useRootNavigation();
    const route = useRootRoute<'FeedList'>();
    const inset = useSafeAreaInsets();

    function onPressClose(){
        navigation.goBack();
    }

    function onPressFeed() {
        console.log(111);
      }

    function renderItem({item}:{item:FeedInfo}){
        return(
            <FeedListItem
            image={item.imageUrl}
            isLiked={false}
            likeCount={item.likeHistory.length}
            writer={item.writer.name}
            comment={item.content}
            onPressFeed={onPressFeed}
            />
        )
    }
    return(
        <View style={{flex: 1, paddingBottom: inset.bottom}}>
            <Header>
                <HeaderTitle title="FEED-LIST"></HeaderTitle>
                <HeaderButton iconName="close" color="black" onPress={onPressClose}/>
            </Header>

            <FlatList 
                data={route.params.list}
                renderItem={renderItem}
            />
        </View>
    )
}