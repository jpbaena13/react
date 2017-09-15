import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Post from '../../posts/containers/Post.jsx';
import api from '../../api.js';
import Loading from '../../shared/components/Loading.jsx';
import Header from '../../shared/components/Header.jsx';

import styles from './Page.css'

class Home extends Component {

	constructor(props) {
		super(props);

		this.state =  {
			page: 1,
			posts: [],
			loading: true,
		}

		this.handleScroll = this.handleScroll.bind(this);
	}

	async componentDidMount() {
		const posts = await api.posts.getList(this.state.page);

		this.setState({
			posts,
			page: this.state.page + 1,
			loading: false
		});

		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll(event) {		
		if (this.state.loading) return null;

		const scrolled = window.scrollY;
		const viewportHeight = window.innerHeight;
		const fullHeight = document.body.clientHeight;

		if ( !(scrolled + viewportHeight + 300 >= fullHeight) ) {
			return null;
		}

		this.setState({ loading: true },
			async () => {
				try {
					const posts = await api.posts.getList(this.state.page);
					this.setState({
						posts: this.state.posts.concat(posts),
						page: this.state.page + 1,
						loading: false,
					})
				} catch (error) {
					console.log(error)
					this.setState({loading: false})
				}
			}
		)
	}

	render() {
		console.log(this.props);
		return (
			<section name="home" className={styles.section}>
				<Header />
				<h1>Home</h1>

				<section className={styles.list}>
					{ this.state.loading && ( 
						<Loading />
					)}
					{this.state.posts
						.map(post => <Post key={post.id} {...post} ></Post>)}
				</section>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.entities,
		page: state.posts.page,
	}
}

// function mapDispatchToProps( dispatch, props) {
// 	return {
// 		dispatch
// 	}
// }

export default connect(mapStateToProps)(Home);