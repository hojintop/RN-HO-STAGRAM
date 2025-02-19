import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useTotalFeedList } from "../selectors/feed";
import { FlatList, View } from "react-native";
import { FeedInfo } from "../@types/FeedInfo";
import { FeedListItem } from "../components/FeedListItem";
import { useDispatch } from "react-redux";
import { favoriteFeed, getFeedList, TypeFeedListDispatch } from "../actions/feed";
import { Spacer } from "../components/Spacer";
import { HeaderButton } from "../components/Header/HeaderButton";
import { useRootNavigation } from "../navigations/RootStackNavigation";

export const HomeScreen: React.FC<{}> = (props) => {
  const [isLike, setIsLike] = useState(false);
  const feedTotalList = useTotalFeedList();
  const navigation = useRootNavigation();


  //Thunk Action 발행
  const dispatch = useDispatch<TypeFeedListDispatch>();

  useEffect(() => {
    dispatch(getFeedList());
  }, []);

  function onPressFeed() {
    console.log(111);
  }

  function onPressAddFeed(){
    navigation.navigate("AddFeed");
  }
  
  function onPressLike(item:FeedInfo){
      dispatch(favoriteFeed(item));
      setIsLike(!isLike);
  }
  
  function renderFeedItem({ item }: { item: FeedInfo }) {
    return (
      <FeedListItem
        image={item.imageUrl}
        isLiked={isLike}
        likeCount={item.likeHistory.length}
        writer={item.writer.name}
        comment={item.content}
        onPressFeed={onPressFeed}
        onPressLike={()=>onPressLike(item)}

      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderTitle title="HOME"></HeaderTitle>
        <HeaderButton iconName="add-outline" color="black" onPress={onPressAddFeed}/>
      </Header>

      <FlatList
        data={feedTotalList}
        renderItem={renderFeedItem}
        ItemSeparatorComponent={() => <Spacer space={15} />}
      />
    </View>
  );
};
