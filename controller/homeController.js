const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Favorites = require('../models/favorites');
const { default: mongoose } = require('mongoose');

const logError = (context, error) => {
    console.error(`Error in ${context}:`, {
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      } : null
    });
  };

const moviesApiUpdate = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in moviesApiUpdate:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const moviesApiSingle = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/phim-le?page=${page}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in moviesApiSingle:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const moviesApiSeries = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/phim-bo?page=${page}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in moviesApiSeries:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const moviesApiAnime = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/hoat-hinh?page=${page}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in moviesApiAnime:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const moviestvShowApi = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/tv-shows?page=${page}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in moviesApiAnime:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const detailMovies = async (req, res) => {
    try {
        const { slug } = req.params;
        const response = await axios.get(`https://phim.nguonc.com/api/film/${slug}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in detailMovies:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const keywordSearchMovies = async (req, res) => {
    try {
        const { keyword } = req.query;
        const response = await axios.get(`https://phim.nguonc.com/api/films/search?keyword=${keyword}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in keywordSearchMovies:', {
            message: error.message,
            code: error.code,
            response: error.response ? {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data
            } : null
        });
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const movieCategories = async (req, res) => {
    try {
        const { slug } = req.params;
        const { page } = req.query;
        const response = await axios.get(`https://phim.nguonc.com/api/films/the-loai/${slug}?page=${page}`, { httpsAgent });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in movieCategories:', {
            message: error.message,
            code: error.code,
            response: error.response ? {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data
            } : null
        });
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUsers = async (req, res) => {
    try {
        const { email } = req.params;
        const user  = await User.findOne({email: email});
        if (user) {
            return res.status(200).json({ exists: true, user: user });
        } else {
            return res.status(404).json({ exists: false, message: 'User not found' });
        }
    } catch (error) {
        console.log("Lỗi lấy hết tất cả users" +error);
    }
}



const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            img: 'default.jpg',
            role: 'user'
        });

        await newUser.save();

        // Create JWT token with the secret
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { email: newUser.email, role: newUser.role }, message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại' });
        }

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email, name: user.name, img: user.img }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { email: user.email, role: user.role }, message: 'Đăng nhập thành công' });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const addFavoriteMovie = async (req, res) => {
    try {
        const { userId, movie } = req.body;

        // Kiểm tra xem userId và movie có được cung cấp không
        if (!userId || !movie) {
            return res.status(400).json({ message: 'userId và movie là bắt buộc' });
        }

        // Kiểm tra xem userId có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID người dùng không hợp lệ' });
        }

        // Kiểm tra xem dữ liệu phim có đầy đủ không
        if (!movie.id || !movie.name) {
            return res.status(400).json({ message: 'Thông tin phim không đầy đủ' });
        }

        // Tìm tài liệu Favorites của người dùng
        let favorites = await Favorites.findOne({ userId });

        if (!favorites) {
            // Tạo mới nếu không tồn tại
            favorites = new Favorites({
                userId,
                favoriteMovies: [movie]
            });
        } else {
            // Kiểm tra xem bộ phim đã tồn tại trong danh sách yêu thích chưa
            const movieExists = favorites.favoriteMovies.some(favMovie => favMovie.id === movie.id);

            if (movieExists) {
                return res.status(400).json({ message: 'Bộ phim đã có trong danh sách yêu thích' });
            }

            // Thêm movie vào danh sách favoriteMovies nếu chưa tồn tại
            favorites.favoriteMovies.push(movie);
        }

        // Lưu tài liệu vào MongoDB
        await favorites.save();
        
        res.status(201).json(favorites); // Trả về tài liệu favorites sau khi lưu thành công
    } catch (error) {
        console.error('Error in addFavoriteMovie:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
const getFavoriteMovies = async (req, res) => {
    const { userId } = req.params;

    try {
        const favorite = await Favorites.findOne({ userId }).populate('userId');
        if (!favorite) {
            return res.status(404).json({ message: "Người dùng không tồn tại hoặc chưa có phim yêu thích nào" });
        }

        return res.status(200).json({ favoriteMovies: favorite.favoriteMovies });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi lấy danh sách yêu thích" });
    }
};
const removeFavoriteMovie = async (req, res) => {
    const { userId, movieId } = req.body;

    try {
        const favorite = await Favorites.findOne({ userId });

        if (!favorite) {
            return res.status(404).json({ message: "Người dùng không tồn tại hoặc chưa có phim yêu thích nào" });
        }

        favorite.favoriteMovies = favorite.favoriteMovies.filter(movie => movie.id !== movieId);

        await favorite.save();
        return res.status(200).json({ favoriteMovies: favorite.favoriteMovies });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi xóa khỏi danh sách yêu thích" });
    }
};

const commentMovie = async (req, res, next) => {
    try{
        const { userId, slug, comment } = req.body;
        if(!userId ||!slug ||!comment){
            return res.status(400).json({message: 'userId, movieId, comment là bắt buộc'});
        }
        const movie = await axios.get(`https://phim.nguonc.com/api/film/${slug}`, { httpsAgent });
        if(!movie){
            return res.status(404).json({message: 'Phim không tồn tại'});
        }
        movie.comments.push({userId, comment});
        await movie.save();
        res.status(201).json(movie);
    }catch(e){
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra về bình luận" });
    }
}



module.exports = {
    moviesApiUpdate,
    moviesApiSingle,
    moviesApiSeries,
    moviesApiAnime,
    detailMovies,
    keywordSearchMovies,
    moviestvShowApi,
    movieCategories,
    getUsers,
    registerUser,
    loginUser,
    addFavoriteMovie,
    getFavoriteMovies,
    removeFavoriteMovie,
    commentMovie
};
