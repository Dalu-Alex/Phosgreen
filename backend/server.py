from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


class ServiceRequestCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    district: str = Field(min_length=2, max_length=60)
    property_type: str = Field(min_length=2, max_length=60)
    service_type: str = Field(min_length=2, max_length=120)
    message: str = Field(default="", max_length=2000)
    consent: bool


class ServiceRequest(ServiceRequestCreate):
    id: str
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "Phosgreen API"}


@api_router.post("/service-requests", status_code=201)
async def create_service_request(payload: ServiceRequestCreate):
    if not payload.consent:
        raise HTTPException(status_code=422, detail="Privacy policy consent is required.")
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.service_requests.insert_one(doc)
    return {
        "id": doc["id"],
        "message": "Service audit request received. Our team will contact you within one business day.",
    }


@api_router.get("/service-requests", response_model=List[ServiceRequest])
async def list_service_requests():
    return await db.service_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
