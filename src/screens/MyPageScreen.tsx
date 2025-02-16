import React, { useEffect, useMemo } from "react";
import { Header } from "../components/Header/Header";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useMyFeedList } from "../selectors/user";
import { useDispatch } from "react-redux";
import { getMyFeedList, TypeUserDispatch } from "../actions/user";
import { FlatList, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { FeedInfo } from "../@types/FeedInfo";
import { RemoteImage } from "../components/RemoteImage";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useRootNavigation } from "../navigations/RootStackNavigation";

export const MyPageScreen:React.FC<{}> = (props)=>{
    const myFeedList = useMyFeedList();
    const rootNavigation = useRootNavigation();

    const {width} = useWindowDimensions();
    const minColumnSize = width >= 500 ? 200 : 130;
    const divisor = width / minColumnSize;
    const numColumns = Math.floor(divisor);

    const photoSize = useMemo(()=>{
        return width / numColumns;
    },[width])

    // //ThunkAction 발행
    const dispatch = useDispatch<TypeUserDispatch>();

    useEffect(()=>{
        dispatch(getMyFeedList());
    },[])

    function onPressFeed(){
        rootNavigation.navigate("FeedList", {list:myFeedList});
    }

    function renderItem({item}:{item:FeedInfo}){
        return(
            <TouchableOpacity onPress={onPressFeed}>
                <RemoteImage 
                    url={item.imageUrl}
                    width={photoSize}
                    height={photoSize}
                />
            </TouchableOpacity>
        )

    }
    return(
        <View style={{flex: 1, }}>
            <Header>
                <HeaderTitle title="MY-PAGE"></HeaderTitle>
            </Header>

            <FlatList 
                data={myFeedList}
                renderItem={renderItem}
                numColumns={numColumns}
            />
        </View>
    )
}