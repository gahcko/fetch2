

const URI = 'http://imtles.noodless.co.ua';
const PER_PAGE = 5;



async function getPosts(page = 1) {
	const postMain = document.querySelector('.posts');
	console.log(postMain);	
	postMain.innerText = '';

	// запрашиваем JSON постов
	const posts_response = await fetch(`${URI}` + '/wp-json/wp/v2/posts' + `?per_page=${PER_PAGE}` + `&page=${page}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/posts?per_page=2&page=1
	const posts_data = await posts_response.json();

	console.log(posts_data);

	async function getImage(id) {
    
		const img_response = await fetch(`${URI}` + '/wp-json/wp/v2/media/' + `${id}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/media/7
		const img_data = await img_response.json();
	
		return img_data;
	  }

	posts_data.map(async (postItem) => {

		const placeholder = {
			'media_details': {
			  'sizes': {
				'thumbnail': {
				  'source_url': './img/avatar.jpg'
				}
			  }
			}
		  }
	
		
	const post = document.createElement('div');
	const postTitle = document.createElement('h2');
	postTitle.innerHTML = postItem.title.rendered;
	
	const date = new Date (postItem.date);
	const postText = document.createElement('p');
	postText.innerHTML = postItem.content.rendered;

	const image = postItem.featured_media ? await getImage(postItem.featured_media) : placeholder;

	const postImage = document.createElement('img');
	postImage.setAttribute('src', `${image.media_details.sizes.thumbnail.source_url}`);

	const postDate = document.createElement('p');
	postDate.innerHTML = `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;

	const button = document.createElement('button');
	button.innerHTML = 'read more';
	button.setAttribute('info', postItem.id);
	

	postMain.appendChild(post);
	post.setAttribute('class', 'post_class');
	post.appendChild(postTitle);
	post.appendChild(postImage);
	post.appendChild(postText);
	post.appendChild(postDate);
	post.appendChild(button);
	
	
	return postMain;
	
	
	})

	let active = 0;
	let activeDots = 0;
	const nextBtn = document.querySelector('.next');
	const prevBtn = document.querySelector('.prev');
	const postsArr = document.getElementsByClassName('post_class');
	console.log(postsArr[0]);
	postsArr[0].classList.add('active');

	const dotsArr = document.getElementsByClassName('dots_item');
	console.log(dotsArr);
	dotsArr[0].classList.add('dots_active');

	nextBtn.addEventListener('click', () => {
		postsArr[active].classList.remove('active');
		dotsArr[activeDots].classList.remove('dots_active');
		
		if(activeDots + 1 == dotsArr.length) {
			activeDots = 0;
		} else {
			activeDots++;
		}
		if(active + 1 == postsArr.length) {
			active = 0;
		} else {
			active++;
		}
		postsArr[active].classList.add('active');
		dotsArr[activeDots].classList.add('dots_active');
})

	prevBtn.addEventListener('click', () => {
		postsArr[active].classList.remove('active');
		dotsArr[activeDots].classList.remove('dots_active');
		if (activeDots == 0) {
			activeDots = dotsArr.length - 1;
		}	
		 else {
			activeDots--;
		}
		if (active == 0) {
			active = postsArr.length - 1;
		}	
		 else {
			active--;
		}
	
		postsArr[active].classList.add('active');
		dotsArr[activeDots].classList.add('dots_active');
	})

	return posts_data;
}

getPosts();

async function getPost(id) {
  
    const container = document.querySelector('.container');
    container.innerHTML = '';
  
    const post_response = await fetch(`${URI}` + '/wp-json/wp/v2/posts/' + `${id}`); // http://imtles.noodless.co.ua/wp-json/wp/v2/posts/10
    const post_data = await post_response.json();
  
    console.log(post_data);

    const postText = document.createElement('p');
    postText.innerHTML = post_data.content.rendered;
    const postTitle = document.createElement('h2');
    postTitle.innerHTML = post_data.title.rendered;
    const postDate = document.createElement('p');
    postDate.innerHTML = post_data.date;
    const button = document.createElement('button');
    button.innerHTML = 'read more';

    // const postImage = document.createElement('img');
    // postImage.setAttribute('src', `${image.media_details.sizes.thumbnail.source_url}`);
    // post.appendChild(postImage);

    
    container.appendChild(postTitle);
    container.appendChild(postText);
    container.appendChild(postDate);
    container.appendChild(button);
  
  }
  
  // getPost(10)

// const nextBtn = document.querySelector('.next');
// const prevBtn = document.querySelector('.prev');
// let active = 0;
// const postsArr = document.querySelectorAll('.post_class');
// console.log(postsArr);

// nextBtn.addEventListener('click', () => {
// 	postsarr[active].classList.remove('active');
// 	active++;
// 	postsarr[active].classList.add('active');

// })

// prevBtn.addEventListener('click', () => {
// 	offset = offset - 400;
// 	if(offset < 0) {
// 		offset = 1200
// 	}
// 	postMain.style.left = -offset + 'px';
// })