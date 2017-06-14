import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post.jsx';
import api from '../../api.js';
import Loading from '../../shared/components/Loading.jsx';

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
		console.log(window.scrollY);
		return null;
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
		return (
			<section name="home">
				<h1>Home</h1>

				<section>
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

export default Home;