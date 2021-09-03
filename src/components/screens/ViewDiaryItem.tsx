import * as React from 'react';
import { View,Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { DiaryItem } from '../../model/DIaryItem';
import Container from '../Container';
import DateNTime from '../DateAndTime';
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-snap-carousel'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';




interface Props {
    route: any;
  }
  
  interface State { }
  
  class ViewDiaryItem extends React.Component<Props, State> {
    private readonly diryItem: DiaryItem = this.props.route.params.diaryItem;
    constructor(props) {
      super(props);
      this.state = {};
    }
    renderItem = data => {
      return (
       <Lightbox>
        <Image
          style={{padding: 5, height: hp('35%')}}
          source={{uri: data.item}}
        />
       </Lightbox> 
      );
    };
  
    render() {
      return (
        <Container
          containerStyles={{justifyContent: 'flex-start', marginTop: 10, padding: 5}}>
            <ScrollView>
              <View>
                <Carousel
                 containerCustomStyle={{height: 'auto', alignSelf: 'center'}}
                 sliderWidth={wp('100%')}
                 itemWidth={wp('100%')}
                 autoplay={true}
                 loop={true}
                 data={this.diryItem.images}
                 renderItem={this.renderItem}
                 />
                 <View style= {{padding: 10}}>
                   <DateNTime timeStamp={this.diryItem.timeStamp}/>
                   <Text style={{
                     marginBottom: 10, 
                     color: 'blue',
                     fontWeight: 'bold'
                   }}>
                  {this.diryItem.subject}
                </Text>

                <Text>{this.diryItem.description}</Text>
                 </View>
              </View>
            </ScrollView>
        </Container>
      );
    }
  
    componentDidMount(): void { }
  }
  
  export default ViewDiaryItem;
