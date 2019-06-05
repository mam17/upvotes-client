import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import bindActionCreatorsExt from "../../helpers/bindActionCreatorsExt";
import { Creators as PostActions } from "../../ducks/post";
import { Creators as AppActions } from "../../ducks/app";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import reactotron from "reactotron-react-native";

const ActionCreators = Object.assign(
    {},
    { postAct: PostActions },
    { appAct: AppActions }
);

class Home extends Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }
    componentDidMount() {
        this.props.appAct.getDeviceId()
    }

    componentDidUpdate() {
        if (this.props.AppReducer.device_id && !this.props.PostReducer.posts) {
            this.props.postAct.getPosts()
        }
    }

    dataFormatter = (date) =>
        `${date.getDate() < 10 && '0'}${date.getDate()}/${date.getMonth() < 10 && '0'}${date.getMonth()}/${date.getFullYear()}`

    render() {
        const { posts } = this.props.PostReducer
        //EU PODERIA TER COMPONENTIZADO ESTA PARTE PARA FICAR MAIS ENXUTO
        // ASSIM COMO TER COLOCADO OS "LOADINGS", MAS NAO TIVE TEMPO

        return (
            <View style={{ marginHorizontal: 20, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* POSTING SPACE */}
                    {
                        <View style={[styles.postContainer, { marginVertical: 5 }]}>
                            <View style={styles.postHeader}>
                                <View style={{ flex: 1 }}>
                                    <Icon name='account-circle' size={30} />
                                </View>
                                <View style={{ flex: 5 }}>
                                    <TextInput
                                        placeholder='No que voce está pensando?'
                                        value={this.state.message}
                                        onChangeText={text => this.setState({ message: text })} />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.postAct.createPost(this.state.message)
                                        this.setState({ message: '' })
                                    }}
                                    style={styles.postFooter}>
                                    <View style={{ backgroundColor: 'blue', borderRadius: 5 }}>
                                        <Text style={{ padding: 8, color: 'white' }}>Publicar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {/* POSTS SPACE */}
                    {
                        posts && !!posts.length ? posts.map((item, index) =>
                            <View style={styles.postContainer} key={index}>
                                <View style={styles.postHeader}>
                                    <View style={{ flex: 1 }}>
                                        <Icon name='account-circle' size={30} />
                                    </View>
                                    <View style={{ flex: 6 }}>
                                        <Text>Annonimous</Text>
                                        <Text>em {this.dataFormatter(new Date(item.post.creationDate))}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text>{item.post.message}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.props.postAct.ratePost(item.id)}
                                    style={styles.postFooter}>
                                    <Icon name='emoticon-happy-outline' size={24}><Text>{item.post.rates}</Text></Icon>
                                </TouchableOpacity>
                            </View>
                        )
                            : <View><Text>Nenhum Post encontrado</Text></View>
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        width: "100%",
        marginBottom: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowColor: "rgba(0,0,0,0.7)",
        shadowRadius: 28,
        shadowOpacity: 0.4,
        shadowOffset: {
            height: 8,
            width: 0
        }
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
        alignItems: 'center',
        alignContent: 'center'
    },
    postFooter: {
        alignContent: 'center',
        alignItems: 'flex-end'
    }
});

const mapStateToProps = state => ({
    PostReducer: state.PostReducer,
    AppReducer: state.AppReducer
});

const mapDispacthToProps = dispatch =>
    bindActionCreatorsExt(ActionCreators, dispatch);

export default connect(
    mapStateToProps,
    mapDispacthToProps
)(Home);
