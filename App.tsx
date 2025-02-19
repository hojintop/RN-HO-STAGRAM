import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { RootApp } from './src/RootApp';
import { Provider } from 'react-redux';
import store from './src/store';


export default function App() {
  const onPressFeed = useCallback(()=>{
    console.log(111);
  },[])
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
      </Provider>
        {/* <FeedListItem 
          image="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMDhfMzkg%2FMDAxNjk5NDAzNjMxMTMz.Dd-7jCSCrMbUDAq_5wxjM0wzupchD0BPfXWLuZwdqxMg._20S89j22A2UZkwJKfrY-OzmgIT-lP0J1YtexCh5uhQg.PNG.mo7933%2F%25B0%25AD%25BE%25C6%25C1%25F6_00_%252813%2529.png&type=a340"
          isLiked={true}
          likeCount={13}
          writer="hojin"
          comment= "What Is This. Ho-stagram!!"
          onPressFeed={onPressFeed}
        /> */}
    </SafeAreaProvider>
  );
}
