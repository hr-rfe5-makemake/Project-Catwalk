import React from "react";
import axios from "axios";
import RelatedProductCard from "./RelatedProductCard.jsx";

class RelatedItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdx: 0,
      relatedItems: [],
      length: 0,
      fetched: false,
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    // get related items
    axios
      .get("/api/fec2/hr-rfe/products/" + this.props.currentItem + "/related")
      .then((result) => {
        this.setState({
          relatedItems: result.data,
          length: result.data.length,
        });
        return result.data;
      })
      .then((data) => {
        // for each of the related items, we want their details
        for (var i = 0; i < data.length; i++) {
          axios
            .get("/api/fec2/hr-rfe/products/" + data[i])
            .then((result) => {
              this.setState({
                [result.data.id]: result.data,
              });
              return result.data.id;
            })
            .catch((err) => {
              console.log("failed to get details of related products");
            })
            .then((id) => {
              // get the ratings of each related item
              axios
                .get("/api/fec2/hr-rfe/reviews/meta?product_id=" + id)
                .then((result) => {
                  if (Object.keys(result.data.ratings).length > 0) {
                    var totalCount = 0;
                    var totalRatings = 0;
                    for (var key in result.data.ratings) {
                      totalRatings += parseInt(result.data.ratings[key]) * key;
                      totalCount += parseInt(result.data.ratings[key]);
                    }
                    var avgRating = totalRatings / totalCount;
                    var newState = this.state[result.data.product_id];
                    newState.rating = avgRating;
                    // MIGHT HAVE TO FIX THIS LATER BECAUSE FETCH AUTOMATICALLY CHANGES TO TRUE BEFORE FINISHING ALL FETCHES
                    this.setState({
                      [result.data.product_id]: newState,
                      fetched: true
                    });
                  }
                  return result.data.product_id;
                })
                .catch((err) => {
                  console.log("failed to fetch ratings");
                })
            });
        }
      })
      .catch((err) => {
        console.log("error");
      });
  }

  previous(event) {
    if (this.state.currentIdx > 0) {
      this.setState({
        currentIdx: this.state.currentIdx - 1,
      });
    }
  }

  next(event) {
    if (this.state.currentIdx < this.state.length - 3) {
      this.setState({
        currentIdx: this.state.currentIdx + 1,
      });
    }
  }

  // fetch() {
  //   axios
  //     .get("/api/fec2/hr-rfe/products/" + this.props.itemId)
  //     .then((result) => {
  //       this.setState({
  //         item: result.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("error");
  //     });
  //   axios
  //     .get("/api/fec2/hr-rfe/reviews/meta?product_id=" + this.props.itemId)
  //     .then((result) => {
  //       if (Object.keys(result.data.ratings).length > 0) {
  //         var totalCount = 0;
  //         var totalRatings = 0;
  //         for (var key in result.data.ratings) {
  //           totalRatings += parseInt(result.data.ratings[key]) * key;
  //           totalCount += parseInt(result.data.ratings[key]);
  //         }
  //         var avgRating = totalRatings / totalCount;
  //         this.setState({
  //           rating: avgRating,
  //         });
  //       }
  //     })
  //   }

  render() {
    if (this.state.length === 0) {
      return <div></div>;
    } else if (this.state.length === 1) {
      return (
        <div>
          <div>Item {this.state.currentIdx}</div>
        </div>
      );
    } else if (this.state.length === 2) {
      <div>
        <div>Item {this.state.currentIdx}</div>
        <div>Item {this.state.currentIdx + 1}</div>
      </div>;
    } else {
      if (this.state.fetched) {
        return (
          <div>
            <div>
              <RelatedProductCard
                item={
                  this.state[this.state.relatedItems[this.state.currentIdx]]
                }
              />
            </div>
            <div>
              <RelatedProductCard
                item={
                  this.state[this.state.relatedItems[this.state.currentIdx + 1]]
                }
              />
            </div>
            <div>
              <RelatedProductCard
                item={
                  this.state[this.state.relatedItems[this.state.currentIdx + 2]]
                }
              />
            </div>
            <button onClick={this.previous}>Previous</button>
            <button onClick={this.next}>Next</button>
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }
}

export default RelatedItemList;