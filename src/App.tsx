import * as React from 'react';
import { RootStore, setupRootStore } from "./models/root-store";
import { Provider } from 'mobx-react';
import { StatefulNavigator } from './navigation';
import { DEFAULT_NAVIGATION_CONFIG } from './navigation/navigation-config';
import { BackButtonHandler } from './navigation/back-button-handler';
import { contains } from 'ramda';

interface AppState {
  rootStore?: RootStore
}

class App extends React.Component<{}, AppState> {

  async componentDidMount() {
    this.setState({
      rootStore: await setupRootStore(),
    });
  }

  canExit(routeName: string) {
    return contains(routeName, DEFAULT_NAVIGATION_CONFIG.exitRoutes);
  }

  render() {
    const rootStore = this.state && this.state.rootStore;

    if(!rootStore) {
      return null;
    }

    const otherStores = {};

    return (
      <Provider rootStore={rootStore} {...otherStores}>
        <BackButtonHandler canExit={this.canExit}>
          <StatefulNavigator />
        </BackButtonHandler>
      </Provider>
    );
  }
};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// const Reference = (
//   <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Fragment>
// );

export default App;
