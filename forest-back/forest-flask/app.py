from flask import Flask, request, jsonify
import ssl
app = Flask(__name__)


@app.route('/similarity', methods=['GET'])
def cosine_similarity():
    # POST 요청으로부터 두 문장을 받아옵니다.
    sentence1 = request.args.get('sentence1')
    sentence2 = request.args.get('sentence2')

    s1 = set(sentence1)
    s2 = set(sentence2)

    # 자카드 유사도 계산
    result = {
        'similarity': int((len(s1.intersection(s2)) / len(s1.union(s2))) * 100)
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context =("cert.pem", "privkey.pem"))
